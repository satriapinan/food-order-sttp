import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SearchIcon from "@mui/icons-material/Search";

import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

import FoodCard from "../components/FoodCard";

// API
const api = {
  get: async (url, { params } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (url === "/food-order/categories") {
      return {
        data: {
          data: [
            { id: "indo", categoryName: "Indonesian Food" },
            { id: "western", categoryName: "Western Food" },
            { id: "asian", categoryName: "Asian Food" },
            { id: "dessert", categoryName: "Desserts" },
          ],
        },
      };
    }
    if (url === "/food-order/foods") {
      let allFoods = [
        {
          id: 1,
          categoryId: "indo",
          categoryName: "Indonesian Food",
          name: "Nasi Goreng Spesial",
          price: "Rp. 25.000",
          status: "Bestseller",
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80",
        },
        {
          id: 2,
          categoryId: "indo",
          categoryName: "Indonesian Food",
          name: "Mie Ayam Pangsit",
          price: "Rp. 20.000",
          status: "Tersedia",
          rating: 4.5,
          image:
            "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80",
        },
        {
          id: 3,
          categoryId: "western",
          categoryName: "Western Food",
          name: "Steak Ayam BBQ",
          price: "Rp. 35.000",
          status: "Promo",
          rating: 4.9,
          image:
            "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&q=80",
        },
        {
          id: 4,
          categoryId: "asian",
          categoryName: "Asian Food",
          name: "Gado-Gado Segar",
          price: "Rp. 18.000",
          status: "Tersedia",
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
        },
        {
          id: 5,
          categoryId: "dessert",
          categoryName: "Desserts",
          name: "Es Krim Vanilla Oreo",
          price: "Rp. 15.000",
          status: "Bestseller",
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80",
        },
      ];

      if (params?.foodName) {
        allFoods = allFoods.filter((f) =>
          f.name.toLowerCase().includes(params.foodName.toLowerCase()),
        );
      }
      if (params?.categoryId) {
        allFoods = allFoods.filter((f) => f.categoryId === params.categoryId);
      }
      if (params?.sortBy === "price") {
        allFoods.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/\D/g, ""));
          const priceB = parseInt(b.price.replace(/\D/g, ""));
          return priceA - priceB;
        });
      } else if (params?.sortBy === "name") {
        allFoods.sort((a, b) => a.name.localeCompare(b.name));
      }
      return { data: { data: allFoods } };
    }
  },
  post: async (url, body) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: "success" };
  },
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
  });
  const { search, category, sortBy } = formik.values;

  useEffect(() => {
    api.get("/food-order/categories").then((res) => {
      setCategories(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { pageSize: 100 };
    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api
      .get("/food-order/foods", { params })
      .then((res) => {
        setFoods(res.data.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, category, sortBy]);

  const categoryOptions = useMemo(() => {
    return [
      { value: "", label: "🔥 Semua Kategori" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      setSnackbar({
        open: true,
        message: `Yummy! ${food.name} masuk ke keranjang 🛒`,
        type: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Gagal menambahkan makanan",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "14px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      transition: "all 0.3s",
      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "rgba(255, 126, 95, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#ff7e5f", borderWidth: "2px" },
      "&.Mui-focused": { boxShadow: "0 0 15px rgba(255, 126, 95, 0.2)" },
    },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        minHeight: "100vh",
        py: 4,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mb: 3 }}
        >
          <Button
            size="small"
            onClick={toggleTheme}
            startIcon={mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#ff7e5f",
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: "12px",
              fontWeight: "900",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#fff",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s",
            }}
          >
            {mode === "light" ? "Dark" : "Light"}
          </Button>
          <Button
            size="small"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#d63031",
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: "12px",
              fontWeight: "900",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#ffebee",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s",
            }}
          >
            Keluar
          </Button>
        </Box>

        <Box
          component="form"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: "24px",
            p: { xs: 3, md: 5 },
            mb: 5,
            boxShadow: "0 15px 35px rgba(255, 126, 95, 0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 1,
            }}
          >
            <RestaurantMenuIcon sx={{ color: "#ff7e5f", fontSize: 40 }} />
            <Typography
              variant="h3"
              align="center"
              fontWeight="900"
              sx={{ color: "#ff7e5f", letterSpacing: "-1px" }}
            >
              Food Margi
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight="600"
            sx={{ color: "#636e72", mb: 4 }}
          >
            Eksplorasi rasa, temukan makanan favoritmu hari ini! ✨
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                name="search"
                placeholder="Cari makanan... (Cth: Ayam, Nasi)"
                variant="outlined"
                value={formik.values.search}
                onChange={formik.handleChange}
                sx={inputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#ff7e5f" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                displayEmpty
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                sx={inputStyle}
              >
                {categoryOptions.map((opt, index) => (
                  <MenuItem
                    key={index}
                    value={opt.value}
                    sx={{ fontWeight: "600" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                displayEmpty
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                sx={inputStyle}
              >
                <MenuItem value="" disabled sx={{ fontWeight: "600" }}>
                  Urutkan Berdasarkan
                </MenuItem>
                <MenuItem value="price" sx={{ fontWeight: "600" }}>
                  💰 Harga Termurah
                </MenuItem>
                <MenuItem value="name" sx={{ fontWeight: "600" }}>
                  🔤 Nama A - Z
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <CircularProgress sx={{ color: "#fff" }} size={60} thickness={4} />
          </Box>
        ) : (
          <Grid container rowSpacing={5} columnSpacing={3}>
            {foods.length > 0 ? (
              foods.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                  <FoodCard item={item} onAddToCart={handleAddToCart} />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "24px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="900"
                    sx={{
                      color: "#fff",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    Yah, makanan yang kamu cari tidak ditemukan 🥲
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", mt: 1, opacity: 0.9 }}
                  >
                    Coba gunakan kata kunci pencarian yang lain.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: "900",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            fontSize: "15px",
            py: 1.5,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuPage;
