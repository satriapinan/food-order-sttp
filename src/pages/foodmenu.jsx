import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FoodCard from "../components/FoodCard";
import api from "../services/api"; // Pastikan import api

const filterSchema = Yup.object({
  search: Yup.string().max(30, "Maksimal 30 karakter pencarian"),
});

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
    validationSchema: filterSchema,
  });
  const { search, category, sortBy } = formik.values;

  useEffect(() => {
    api
      .get("/food-order/categories")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.error("Gagal mengambil kategori:", err);
      });
  }, []);

  useEffect(() => {
    const params = { pageSize: 100 };

    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api
      .get("/food-order/foods", { params })
      .then((res) => {
        setFoods(res.data.data || []);
      })
      .catch((err) => {
        console.error("Gagal mengambil makanan:", err);
      });
  }, [search, category, sortBy]);

  const categoryOptions = useMemo(() => {
    return [
      { value: "", label: "Semua Kategori" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      alert(`${food.name || "Makanan"} berhasil ditambahkan ke keranjang!`);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambahkan ke keranjang");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #8b0000, #3e0000)",
        padding: 4,
      }}
    >
      {/* HEADER & FILTER */}
      <Card
        sx={{
          borderRadius: 4,
          padding: 3,
          marginBottom: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#8b0000" }}
          >
            Menu Makanan
          </Typography>
        </Box>

        <TextField
          fullWidth
          name="search"
          placeholder="Cari nama makanan..."
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2 }}
          value={formik.values.search}
          onChange={formik.handleChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
          helperText={formik.touched.search && formik.errors.search}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Dropdown Kategori Mengambil Data dari API */}
          <TextField
            select
            name="category"
            label="Kategori"
            size="small"
            sx={{ minWidth: 150 }}
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="sortBy"
            label="Urutkan Harga"
            size="small"
            sx={{ minWidth: 150 }}
            value={formik.values.sortBy}
            onChange={formik.handleChange}
          >
            <MenuItem value="">Normal</MenuItem>
            <MenuItem value="murah">Termurah</MenuItem>
            <MenuItem value="mahal">Termahal</MenuItem>
          </TextField>
        </Box>
      </Card>

      {/* GRID KARTU MAKANAN DARI API */}
      <Grid container spacing={3}>
        {foods.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="white" textAlign="center">
              Makanan tidak ditemukan.
            </Typography>
          </Grid>
        ) : (
          foods.map((menu) => (
            <Grid item xs={12} sm={6} md={3} key={menu.id}>
              <FoodCard menu={menu} onAddToCart={() => handleAddToCart(menu)} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default FoodMenu;
