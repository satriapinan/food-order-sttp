import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import FoodCard from "./FoodCard";
import api from "../services/api"; 
import { useTheme } from "../hooks/useTheme";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price,asc", label: "Harga Terendah" },
  { value: "price,desc", label: "Harga Tertinggi" },
  { value: "name,asc", label: "Nama A-Z" },
];

// Data dummy, dipakai kalau API kosong/belum siap
const dummyFoods = [
  {
    id: 1,
    category: "Indonesian Food",
    name: "Nasi Goreng",
    price: "Rp. 25.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 2,
    category: "Indonesian Food",
    name: "Mie Ayam",
    price: "Rp. 20.000",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
  },
  {
    id: 3,
    category: "Western Food",
    name: "Ayam Bakar",
    price: "Rp. 35.000",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
  },
  {
    id: 4,
    category: "Asian Food",
    name: "Gado-Gado",
    price: "Rp. 18.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 5,
    category: "Desserts",
    name: "Es Krim Vanilla",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400",
  },
  {
    id: 6,
    category: "Desserts",
    name: "Es Krim Cokelat",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
  },
];

const dummyCategories = [
  { id: 1, categoryName: "Indonesian Food" },
  { id: 2, categoryName: "Western Food" },
  { id: 3, categoryName: "Asian Food" },
  { id: 4, categoryName: "Desserts" },
];

function FoodMenuPage() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const [foods, setFoods] = useState(dummyFoods);
  // TODO: ganti kalo backend udah nyediain endpoint categorie
  const [categories, setCategories] = useState(dummyCategories);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };
  const closeSnackbar = () => {
    setSnackbar((s) => ({ ...s, open: false }));
  };

  const formik = useFormik({
    initialValues: {
      search: "",
      category: "",
      sortBy: "",
    },
  });

  const { search, category, sortBy } = formik.values;

  useEffect(() => {
    api
      .get("/food-order/categories")
      .then((res) => {
        const data = res.data.data;
        if (data && data.length > 0) setCategories(data);
      })
      .catch(() => {
        // API belum siap / gagal, tetap pakai dummyCategories
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
        const data = res.data.data;
        if (data && data.length > 0) setFoods(data);
      })
      .catch(() => {
        // API belum siap / gagal, tetap pakai dummyFoods
      });
  }, [search, category, sortBy]);

  const categoryOptions = useMemo(() => {
    return [
      { value: "", label: "Semua" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  // filter & sort data yang lagi ditampilkan (biar tetap jalan walau API belum ada)
  const filteredFoods = useMemo(() => {
    let result = [...foods];

    if (search) {
      result = result.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      const selected = categories.find((c) => String(c.id) === category);
      const categoryName = selected?.categoryName;
      result = result.filter(
        (f) =>
          String(f.categoryId) === category ||
          f.category === categoryName ||
          f.categories?.categoryName === categoryName
      );
    }

    if (sortBy === "price,asc" || sortBy === "price,desc") {
      const toNumber = (p) => Number(String(p).replace(/[^0-9]/g, ""));
      result.sort((a, b) =>
        sortBy === "price,asc" ? toNumber(a.price) - toNumber(b.price) : toNumber(b.price) - toNumber(a.price)
      );
    } else if (sortBy === "name,asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [foods, search, category, categories, sortBy]);

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      showSnackbar(`${food.name} ditambahkan ke keranjang!`);
    } catch {
      showSnackbar("Gagal menambahkan ke keranjang", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#121212" : "#6B9CAE",
        padding: { xs: 2, md: 5 },
      }}
    >
      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, borderRadius: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#548394", mb: 0.5 }}>
          Food Menu
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", textAlign: "center", marginBottom: "20px" }}>
          Discover delicious meals just for you
        </Typography>

        <TextField
          fullWidth
          size="small"
          placeholder="Search for food..."
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Kategori</InputLabel>
            <Select name="category" value={formik.values.category} label="Kategori" onChange={formik.handleChange}>
              {categoryOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select name="sortBy" value={formik.values.sortBy} label="Sort By" onChange={formik.handleChange}>
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} isDark={isDark} onAddToCart={handleAddToCart} />
        ))}
      </Box>

      {filteredFoods.length === 0 && (
        <Typography variant="body2" sx={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
          Tidak ada makanan ditemukan.
        </Typography>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity || "success"}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FoodMenuPage;