import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import FoodCard from "../components/foodcard"; // <--- Import Komponen FoodCard
import api from "../services/api";
import { useSnackbar } from "../hooks/useSnackbar";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price,asc", label: "Harga Terendah" },
  { value: "price,desc", label: "Harga Tertinggi" },
  { value: "name,asc", label: "Nama A-Z" },
];

export default function FoodMenuPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
  });

  const { search, category, sortBy } = formik.values;

  // Fetch Kategori
  useEffect(() => {
    api.get("/food-order/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error categories:", err));
  }, []);

  // Fetch Daftar Makanan dari API
  useEffect(() => {
    const params = { pageSize: 100 };
    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api.get("/food-order/foods", { params })
      .then((res) => {
        setFoods(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error foods:", err);
        showSnackbar("Gagal mengambil data makanan", "error");
      });
  }, [search, category, sortBy]);

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      showSnackbar(`${food.foodName} ditambahkan ke keranjang!`, "success");
    } catch (err) {
      showSnackbar("Gagal menambahkan ke keranjang", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#3AAFA9", p: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 4 }}>
        <Button variant="contained" sx={{ backgroundColor: "#2B7A78" }}>
          DARK MODE
        </Button>
        <Button variant="contained" color="error">
          LOGOUT
        </Button>
      </Box>

      <Typography variant="h2" sx={{ textAlign: "center", color: "white", fontWeight: 800, mb: 1 }}>
        Food Menu
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", color: "white", mb: 4 }}>
        Discover delicious meals just for you
      </Typography>

      {/* FILTER & SEARCH CONTAINER */}
      <Box
        sx={{
          backgroundColor: "#E0F2F1",
          borderRadius: "20px",
          p: 2,
          mb: 4,
          display: "flex",
          gap: 2,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          size="small"
          name="search"
          placeholder="Search for food..."
          value={formik.values.search}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "white", borderRadius: "8px" }}
        />
        <TextField
          select
          size="small"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "white", borderRadius: "8px", minWidth: "150px" }}
          displayEmpty
        >
          <MenuItem value="">Semua Kategori</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.categoryName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          name="sortBy"
          value={formik.values.sortBy}
          onChange={formik.handleChange}
          sx={{ backgroundColor: "white", borderRadius: "8px", minWidth: "150px" }}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* DAFTAR KARTU MAKANAN / FOOD CARDS GRID */}
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Grid container spacing={3} justifyContent="center">
          {foods.map((food) => (
            <Grid item key={food.id}>
              <FoodCard food={food} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>

        {/* JIKA MAKANAN KOSONG */}
        {foods.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: "center", color: "white", mt: 6 }}>
            Tidak ada makanan yang ditemukan.
          </Typography>
        )}
      </Box>

      {/* SNACKBAR NOTIFIKASI */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}