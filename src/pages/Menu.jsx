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
        {
          id: 6,
          categoryId: "indo",
          categoryName: "Indonesian Food",
          name: "Sate Ayam Madura",
          price: "Rp. 28.000",
          status: "Bestseller",
          rating: 4.9,
          image:
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
        },
        {
          id: 7,
          categoryId: "western",
          categoryName: "Western Food",
          name: "Burger Keju Leleh",
          price: "Rp. 30.000",
          status: "Promo",
          rating: 4.6,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
        },
        {
          id: 8,
          categoryId: "asian",
          categoryName: "Asian Food",
          name: "Ramen Kuah Gurih",
          price: "Rp. 32.000",
          status: "Tersedia",
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
        },
      ];

      if (params?.foodName) {
        allFoods = allFoods.filter((f) =>
          f.name.toLowerCase().includes(params.foodName.trim().toLowerCase()),
        );
      }
      if (params?.categoryId) {
        allFoods = allFoods.filter((f) => f.categoryId === params.categoryId);
      }
      if (params?.sortBy === "price") {
        allFoods.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, ""), 10) -
            parseInt(b.price.replace(/[^0-9]/g, ""), 10),
        );
      } else if (params?.sortBy === "name") {
        allFoods.sort((a, b) => a.name.localeCompare(b.name));
      }

      return { data: { data: allFoods } };
    }
    return { data: { data: [] } };
  },
  post: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: "success" };
  },
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

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
    let isMounted = true;
    api
      .get("/food-order/categories")
      .then((res) => {
        if (isMounted) {
          setCategories(res?.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) setCategories([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const params = { pageSize: 100 };
    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api
      .get("/food-order/foods", { params })
      .then((res) => {
        if (isMounted) {
          setFoods(res?.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) setFoods([]);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
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
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const inputStyle = {
    backgroundColor: isDark
      ? "rgba(255, 255, 255, 0.07)"
      : "rgba(255, 255, 255, 0.8)",
    color: isDark ? "#f5f6fa" : "#2d3436",
    borderRadius: "14px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      transition: "all 0.3s",
      "& fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "transparent",
      },
      "&:hover fieldset": { borderColor: "rgba(255, 126, 95, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#ff7e5f", borderWidth: "2px" },
      "&.Mui-focused": { boxShadow: "0 0 15px rgba(255, 126, 95, 0.2)" },
    },
    "& .MuiSelect-select": {
      color: isDark ? "#f5f6fa" : "#2d3436",
    },
    "& .MuiInputBase-input": {
      color: isDark ? "#f5f6fa" : "#2d3436",
    },
  };

  return (
    <Box
      sx={{
        background: isDark
          ? "radial-gradient(ellipse at top, #1e1e24 0%, #121212 100%)"
          : "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        minHeight: "100vh",
        py: 4,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: isDark ? "#f5f6fa" : "#2d3436",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mb: 3 }}
        >
          <Button
            size="small"
            onClick={toggleTheme}
            startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.9)",
              color: isDark ? "#feca57" : "#ff7e5f",
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: "12px",
              fontWeight: "900",
              boxShadow: isDark
                ? "0 4px 15px rgba(0,0,0,0.4)"
                : "0 4px 15px rgba(0,0,0,0.1)",
              border: "1px solid",
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.15)" : "#fff",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s",
            }}
          >
            {isDark ? "Light" : "Dark"}
          </Button>
          <Button
            size="small"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.9)",
              color: isDark ? "#ff6b6b" : "#d63031",
              textTransform: "none",
              px: 2,
              py: 1,
              borderRadius: "12px",
              fontWeight: "900",
              boxShadow: isDark
                ? "0 4px 15px rgba(0,0,0,0.4)"
                : "0 4px 15px rgba(0,0,0,0.1)",
              border: "1px solid",
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 107, 107, 0.15)"
                  : "#ffebee",
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
            backgroundColor: isDark
              ? "rgba(30, 30, 36, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255,255,255,0.5)",
            borderRadius: "24px",
            p: { xs: 3, md: 5 },
            mb: 5,
            boxShadow: isDark
              ? "0 20px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 126, 95, 0.15)"
              : "0 15px 35px rgba(255, 126, 95, 0.2)",
            transition: "all 0.3s ease-in-out",
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
              sx={{
                background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-1px",
              }}
            >
              Food Margi
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight="600"
            sx={{
              color: isDark ? "#a4b0be" : "#636e72",
              mb: 4,
            }}
          >
            Eksplorasi rasa, temukan makanan favoritmu hari ini! ✨
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={12} md={6} size={{ xs: 12, md: 6 }}>
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
            <Grid xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                displayEmpty
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                sx={inputStyle}
              >
                {categoryOptions.map((opt) => (
                  <MenuItem
                    key={opt.value || "all"}
                    value={opt.value}
                    sx={{ fontWeight: "600" }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }}>
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
            <CircularProgress
              sx={{ color: "#ff7e5f" }}
              size={60}
              thickness={4}
            />
          </Box>
        ) : (
          <Grid container rowSpacing={5} columnSpacing={3}>
            {foods.length > 0 ? (
              foods.map((item) => (
                <Grid
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={item.id}
                >
                  <FoodCard item={item} onAddToCart={handleAddToCart} />
                </Grid>
              ))
            ) : (
              <Grid xs={12} size={{ xs: 12 }}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    backgroundColor: isDark
                      ? "rgba(30, 30, 36, 0.6)"
                      : "rgba(255, 255, 255, 0.2)",
                    borderRadius: "24px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "transparent",
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="900"
                    sx={{
                      color: isDark ? "#f5f6fa" : "#fff",
                      textShadow: isDark
                        ? "none"
                        : "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    Yah, makanan yang kamu cari tidak ditemukan 🥲
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? "#a4b0be" : "#fff",
                      mt: 1,
                      opacity: 0.9,
                    }}
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
