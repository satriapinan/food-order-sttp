import { useState, useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import AppTextField from "../components/AppTextField";
import AppSelect from "../components/AppSelect";
import FoodCard from "../components/FoodCard";
import AppSnackbar, { useSnackbar } from "../components/AppSnackbar";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price,asc", label: "Harga Terendah" },
  { value: "price,desc", label: "Harga Tertinggi" },
  { value: "name,asc", label: "Nama A-Z" },
];

function FoodOrderPage() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

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
    const params = { pageSize: 100 };

    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api.get("/food-order/foods", { params }).then((res) => {
      setFoods(res.data.data || []);
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

  const handleAddToCart = async (food) => {
    try {
      await api.post("/food-order/cart", { foodId: food.id });
      showSnackbar(`${food.name} ditambahkan ke keranjang!`);
    } catch {
      showSnackbar("Gagal menambahkan ke keranjang", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "0 auto", padding: "16px 0" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, textAlign: "center", marginBottom: "4px" }}
      >
        Food Menu
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#888", textAlign: "center", marginBottom: "20px" }}
      >
        Discover delicious meals just for you
      </Typography>

      <Box sx={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <AppTextField
          label="Search for food..."
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          size="small"
          sx={{ marginBottom: 0, flex: 1 }}
        />
        <AppSelect
          label="Kategori"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          options={categoryOptions}
        />
        <AppSelect
          label="Sort By"
          name="sortBy"
          value={formik.values.sortBy}
          onChange={formik.handleChange}
          options={SORT_OPTIONS}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            isDark={isDark}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      {foods.length === 0 && (
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#888", marginTop: "40px" }}
        >
          Tidak ada makanan ditemukan.
        </Typography>
      )}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default FoodOrderPage;
