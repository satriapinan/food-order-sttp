import { useState, useEffect, useMemo, useCallback } from "react";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FoodCard from "../components/FoodCard";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Harga Terendah" },
  { value: "price-desc", label: "Harga Tertinggi" },
  { value: "name-asc", label: "Nama A-Z" },
];

function FoodMenu() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
    onSubmit: (values) => console.log(values),
  });

  const { search, category, sortBy } = formik.values;

  // 1. Fetch Categories
  useEffect(() => {
    api
      .get("/food-order/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error categories:", err));
  }, []);

  const categoryOptions = useMemo(() => {
    const defaultCategories = [
      { value: "Indonesian Food", label: "Indonesian Food" },
      { value: "Western Food", label: "Western Food" },
      { value: "Asian Food", label: "Asian Food" },
      { value: "Desserts", label: "Desserts" },
      { value: "Beverages", label: "Beverages" },
    ];

    const apiCategories = categories.map((c) => ({
      value: String(c.id),
      label: c.categoryName,
    }));

    const combined = [...apiCategories];

    defaultCategories.forEach((def) => {
      const exists = combined.some(
        (item) => item.label.toLowerCase() === def.label.toLowerCase()
      );
      if (!exists) {
        combined.push(def);
      }
    });

    return [{ value: "", label: "Semua" }, ...combined];
  }, [categories]);

  const getCategoryName = useCallback((food) => {
    if (food.categoryName) return food.categoryName;
    if (typeof food.category === "string" && food.category) return food.category;
    if (food.category?.categoryName) return food.category.categoryName;
    if (food.categories?.categoryName) return food.categories.categoryName;

    if (food.categoryId) {
      const found = categoryOptions.find((c) => c.value === String(food.categoryId));
      if (found) return found.label;
    }

    const name = (food.foodName || food.name || "").toLowerCase();
    if (name.includes("es krim") || name.includes("vanilla")) return "Desserts";
    if (name.includes("burger")) return "Western Food";
    if (name.includes("ramen")) return "Asian Food";
    if (name.includes("cappuccino") || name.includes("es") || name.includes("jus") || name.includes("kopi"))
      return "Beverages";

    return "Indonesian Food";
  }, [categoryOptions]);

  const checkIsAvailable = (food) => {
    if (typeof food.isAvailable === "boolean") return food.isAvailable;
    if (typeof food.is_available === "boolean") return food.is_available;
    if (typeof food.stock === "number") return food.stock > 0;
    if (food.status) return food.status.toLowerCase() === "available" || food.status.toLowerCase() === "tersedia";
    return true;
  };

  useEffect(() => {
    let ignore = false;

    const fetchFoods = async () => {
      setIsLoading(true);
      setFetchError("");

      const params = { pageSize: 100 };
      if (search) params.foodName = search;
      if (category && !isNaN(category)) params.categoryId = category;
      if (sortBy) params.sortBy = sortBy.replace("-", ",");

      try {
        const res = await api.get("/food-order/foods", { params });
        if (ignore) return;

        let fetchedData = res.data.data || [];

        if (category) {
          const selectedOpt = categoryOptions.find((c) => c.value === category);
          const selectedLabel = selectedOpt ? selectedOpt.label.toLowerCase() : category.toLowerCase();

          fetchedData = fetchedData.filter((f) => {
            const matchesId = String(f.categoryId) === String(category);
            const matchesName = getCategoryName(f).toLowerCase() === selectedLabel;
            return matchesId || matchesName;
          });
        }

        setFoods(fetchedData);
      } catch (err) {
        if (ignore) return;
        console.error("Error foods:", err);
        setFoods([]);
        setFetchError("Gagal memuat daftar makanan. Pastikan server aktif, lalu coba lagi.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchFoods();

    return () => {
      ignore = true;
    };
  }, [search, category, sortBy, categoryOptions, getCategoryName]);

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      showSnackbar(`${food.foodName || food.name} ditambahkan ke keranjang!`, "success");
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || "Gagal menambahkan ke keranjang.",
        "error"
      );
    }
  };

  const getImageUrl = (food) => {
    const rawUrl = food.imageUrl || food.image_url || food.image || food.photo;
    if (rawUrl && typeof rawUrl === "string" && rawUrl.startsWith("http")) return rawUrl;

    const foodName = (food.foodName || food.name || "").toLowerCase();
    if (foodName.includes("nasi goreng"))
      return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("mie"))
      return "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("ayam bakar"))
      return "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("gado"))
      return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("es krim") || foodName.includes("vanilla"))
      return "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("burger"))
      return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("ramen"))
      return "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80";
    if (foodName.includes("cappuccino"))
      return "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=500&q=80";

    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80";
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: isDark ? "#2A2A2A" : "#FAFAFD",
      "& fieldset": { borderColor: isDark ? "#3D3D3D" : "#E5E2F2" },
      "&:hover fieldset": { borderColor: "#6D5BD0" },
      "&.Mui-focused fieldset": { borderColor: "#6D5BD0", borderWidth: "1.5px" },
    },
    "& .MuiOutlinedInput-input": { color: isDark ? "#fff" : undefined },
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 4 }}>
      {/* Header & Filter */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "18px",
          backgroundColor: isDark ? "#1E1E1E" : "#fff",
          border: isDark ? "1px solid #2E2E2E" : "1px solid #ECE9F7",
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.35)"
            : "0 4px 14px rgba(31,20,80,0.05), 0 24px 48px rgba(31,20,80,0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              backgroundColor: "#6D5BD0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(109,91,208,0.35)",
            }}
          >
            <RestaurantMenuIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
            Food Menu
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: isDark ? "#9B96B0" : "#8B87A3", mb: 3 }}>
          Temukan menu favoritmu hari ini
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                name="search"
                placeholder="Cari makanan..."
                value={formik.values.search}
                onChange={formik.handleChange}
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: "#8B87A3" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                size="small"
                displayEmpty
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                sx={fieldSx}
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryOutlinedIcon fontSize="small" sx={{ color: "#8B87A3" }} />
                  </InputAdornment>
                }
              >
                {categoryOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Select
                fullWidth
                size="small"
                displayEmpty
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                sx={fieldSx}
                startAdornment={
                  <InputAdornment position="start">
                    <SortOutlinedIcon fontSize="small" sx={{ color: "#8B87A3" }} />
                  </InputAdornment>
                }
              >
                {SORT_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#6D5BD0", mb: 2 }} />
          <Typography variant="body2" sx={{ color: isDark ? "#9B96B0" : "#8B87A3" }}>
            Memuat menu makanan...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {!isLoading && fetchError && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: "12px", "& .MuiAlert-message": { fontWeight: 500 } }}
        >
          {fetchError}
        </Alert>
      )}

      {/* Empty State */}
      {!isLoading && !fetchError && foods.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: isDark ? "#9B96B0" : "#8B87A3",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Tidak ada makanan ditemukan
          </Typography>
          <Typography variant="body2">
            Coba ubah kata kunci pencarian atau filter kategori
          </Typography>
        </Box>
      )}

      {/* Grid Makanan */}
      {!isLoading && !fetchError && foods.length > 0 && (
        <Grid container spacing={3}>
          {foods.map((food) => (
            <Grid key={food.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <FoodCard
                image={getImageUrl(food)}
                category={getCategoryName(food)}
                name={food.foodName || food.name}
                price={food.price}
                rating={food.rating || 5.0}
                isAvailable={checkIsAvailable(food)}
                onAddToCart={() => handleAddToCart(food)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FoodMenu;