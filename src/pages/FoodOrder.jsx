import { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import AppTextField from "../components/AppTextField";
import AppSelect from "../components/AppSelect";
import FoodCard from "../components/FoodCard";
import { useTheme } from "../hooks/useTheme";

const FOOD_DATA = [
  {
    id: 1,
    name: "Nasi Goreng",
    price: 25000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 2,
    name: "Mie Ayam",
    price: 20000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 3,
    name: "Ayam Bakar",
    price: 35000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 4,
    name: "Gado-Gado",
    price: 18000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 5,
    name: "Spaghetti Carbonara",
    price: 45000,
    category: "Western Food",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 6,
    name: "Burger Deluxe",
    price: 40000,
    category: "Western Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    available: false,
  },
  {
    id: 7,
    name: "Es Krim Vanilla",
    price: 15000,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: 8,
    name: "Brownies Coklat",
    price: 22000,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    available: true,
  },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Semua" },
  { value: "Indonesian Food", label: "Indonesian Food" },
  { value: "Western Food", label: "Western Food" },
  { value: "Desserts", label: "Desserts" },
];

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Harga Terendah" },
  { value: "price_desc", label: "Harga Tertinggi" },
  { value: "name_asc", label: "Nama A-Z" },
];

function FoodOrderPage() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
  });

  const { search, category, sortBy } = formik.values;

  const filteredFoods = useMemo(() => {
    let result = [...FOOD_DATA];

    if (search) {
      result = result.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      result = result.filter((f) => f.category === category);
    }

    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sortBy]);

  const handleAddToCart = (food) => {
    alert(`${food.name} ditambahkan ke keranjang!`);
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
          options={CATEGORY_OPTIONS}
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
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            isDark={isDark}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      {filteredFoods.length === 0 && (
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#888", marginTop: "40px" }}
        >
          Tidak ada makanan ditemukan.
        </Typography>
      )}
    </Box>
  );
}

export default FoodOrderPage;
