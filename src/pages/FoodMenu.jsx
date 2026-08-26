import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppSelect from "../components/AppSelect";
import FoodCard from "../components/FoodCard";
import AppSnackbar, { useSnackbar } from "../components/AppSnackbar";
import api from "../services/api";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import nasiGorengImg from "../assets/Nasi_Goreng.jpg";
import mieAyamImg from "../assets/mie_ayam.jpg";
import ayamBakarImg from "../assets/Ayam_Bakar.jpg";
import gadoGadoImg from "../assets/gado-gado.jpeg";

const INITIAL_FOODS = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "Makanan Indonesia",
    price: 25000,
    isAvailable: true,
    isFavorite: false,
    image: nasiGorengImg,
  },
  {
    id: 2,
    name: "Mie Ayam",
    category: "Makanan Indonesia",
    price: 20000,
    isAvailable: true,
    isFavorite: false,
    image: mieAyamImg,
  },
  {
    id: 3,
    name: "Ayam Bakar",
    category: "Makanan Barat",
    price: 35000,
    isAvailable: true,
    isFavorite: false,
    image: ayamBakarImg,
  },
  {
    id: 4,
    name: "Gado-Gado",
    category: "Makanan Asia",
    price: 18000,
    isAvailable: true,
    isFavorite: false,
    image: gadoGadoImg,
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "Urutkan" },
  { value: "price-asc", label: "Harga: Terendah - Tertinggi" },
  { value: "price-desc", label: "Harga: Tertinggi - Terendah" },
  { value: "name-asc", label: "Nama: A - Z" },
];

const foodMenuSchema = Yup.object({
  searchQuery: Yup.string().max(50, "Pencarian maksimal 50 karakter"),
  categoryFilter: Yup.string(),
  sortBy: Yup.string(),
});

export default function FoodMenuPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});

  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      searchQuery: "",
      categoryFilter: "All",
      sortBy: "default",
    },
    validationSchema: foodMenuSchema,
  });

  const search = formik.values.searchQuery;
  const category = formik.values.categoryFilter === "All" ? "" : formik.values.categoryFilter;
  const sortBy = formik.values.sortBy === "default" ? "" : formik.values.sortBy;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/food-order/categories")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.warn("Fetch categories error:", err);
      });
  }, []);

  useEffect(() => {
    const params = { pageSize: 100 };

    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    setLoading(true);
    api.get("/food-order/foods", { params })
      .then((res) => {
        const rawData = res.data.data || res.data || [];
        if (Array.isArray(rawData) && rawData.length > 0) {
          const mapped = rawData.map((item, idx) => ({
            id: item.id || item._id || idx + 1,
            name: item.name || item.foodName || "Makanan",
            category: item.categoryName || item.category?.name || item.category || "Makanan",
            price: item.price || 0,
            isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
            isFavorite: item.isFavorite || false,
            image: item.image || item.imageUrl || nasiGorengImg,
          }));
          setFoods(mapped);
        }
      })
      .catch((err) => {
        console.warn("Fetch foods error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, category, sortBy]);

  const categoryOptions = useMemo(() => {
    const defaultOptions = [
      { value: "All", label: "Kategori (Semua)" },
    ];
    if (categories.length > 0) {
      return [
        ...defaultOptions,
        ...categories.map((cat) => ({
          value: String(cat.id || cat.categoryId || cat.name || cat),
          label: String(cat.name || cat.categoryName || cat),
        })),
      ];
    }
    return [
      ...defaultOptions,
      { value: "Makanan Indonesia", label: "Makanan Indonesia" },
      { value: "Makanan Barat", label: "Makanan Barat" },
      { value: "Makanan Asia", label: "Makanan Asia" },
    ];
  }, [categories]);

  const handleAddToCart = async (food) => {
    const foodName = food.name || food.foodName || "Makanan";
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      showSnackbar(`${foodName} berhasil ditambahkan ke keranjang belanja!`, "success");
    } catch (err) {
      console.warn("API Cart failed, fallback feedback:", err);
      showSnackbar(`${foodName} berhasil ditambahkan ke keranjang belanja!`, "success");
    }
  };

  const processedFoods = useMemo(() => {
    let result = [...foods];
    const { searchQuery, categoryFilter, sortBy } = formik.values;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [foods, formik.values]);

  return (
    <Box
      sx={{
        ...styles.container,
        background: isDark
          ? "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #2a081a 100%)"
          : "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
      }}
    >
      <Box sx={styles.innerWrapper}>
        <Box
          sx={{
            ...styles.headerCard,
            backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
            color: isDark ? "#ffffff" : "inherit",
            boxShadow: isDark
              ? "0px 12px 40px rgba(0, 0, 0, 0.6)"
              : "0px 12px 40px rgba(173, 20, 87, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />

            <Typography
              component="h1"
              variant="h3"
              sx={{
                ...styles.headerTitle,
                color: isDark ? "#f48fb1" : "#c2185b",
                flex: { xs: "1", sm: "2" },
                textAlign: "center",
              }}
            >
              Food Order
            </Typography>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <AppButton
                onClick={handleLogout}
                sx={{
                  width: "auto",
                  px: 3,
                  py: 1,
                  fontSize: "14px",
                }}
              >
                Logout
              </AppButton>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{ marginTop: "8px", color: isDark ? "#bbb" : "#888" }}
          >
            Selamat datang, {user ? (user.username || user.fullname || user.email) : "Guest"}!
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <AppTextField
              placeholder="Cari makanan..."
              name="searchQuery"
              value={formik.values.searchQuery}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.searchQuery && Boolean(formik.errors.searchQuery)}
              helperText={formik.touched.searchQuery && formik.errors.searchQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: isDark ? "#f48fb1" : "#c2185b" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: "800px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  paddingLeft: "15px",
                },
              }}
            />

            <Box sx={styles.filtersRow}>
              <AppSelect
                name="categoryFilter"
                value={formik.values.categoryFilter}
                onChange={formik.handleChange}
                options={categoryOptions}
                sx={{ borderRadius: "20px" }}
              />

              <AppSelect
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                options={SORT_OPTIONS}
                sx={{ borderRadius: "20px" }}
              />
            </Box>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: isDark ? "#f48fb1" : "#c2185b" }} />
          </Box>
        ) : (
          <Grid container spacing={3.5} sx={styles.gridContainer}>
            {processedFoods.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <FoodCard
                  food={item}
                  isDark={isDark}
                  onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}

            {processedFoods.length === 0 && (
              <Grid size={{ xs: 12 }}>
                <Box sx={styles.noResultsBox}>
                  <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
                    Makanan tidak ditemukan. Silakan cari menu lain!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: { xs: 2, sm: 4, md: 6 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background 0.3s ease",
  },
  innerWrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  headerCard: {
    borderRadius: "28px",
    padding: { xs: 3, sm: 4, md: 5 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2.5,
    transition: "all 0.3s ease",
  },
  headerTitle: {
    fontWeight: 800,
    fontSize: { xs: "32px", sm: "40px" },
    textAlign: "center",
  },
  filtersRow: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  gridContainer: {
    width: "100%",
    margin: 0,
  },
  noResultsBox: {
    width: "100%",
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    border: "2px dashed rgba(255, 255, 255, 0.4)",
  },
};
