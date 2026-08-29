import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FoodCard from "../components/FoodCard";
import { useTheme } from "../hooks/useTheme";
import { foodApi } from "../services/api";

const fallbackFoods = [
  {
    id: 54,
    name: "Nasi Goreng Special",
    category: "Indonesian Food",
    categoryId: 1,
    price: 25000,
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 55,
    name: "Sate Ayam Madura",
    category: "Indonesian Food",
    categoryId: 1,
    price: 30000,
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 56,
    name: "Beef Juicy Burger",
    category: "Western Food",
    categoryId: 2,
    price: 45000,
    rating: 4.5,
    available: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 57,
    name: "Spaghetti Carbonara",
    category: "Western Food",
    categoryId: 2,
    price: 38000,
    rating: 4.7,
    available: false,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 61,
    name: "Ramen Chicken Katsu",
    category: "Asian Food",
    categoryId: 6,
    price: 35000,
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 58,
    name: "Es Krim Vanilla",
    category: "Desserts",
    categoryId: 3,
    price: 15000,
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 59,
    name: "Chicken Crispy Burger",
    category: "Fast Food",
    categoryId: 4,
    price: 32000,
    rating: 4.7,
    available: true,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 60,
    name: "Gado-Gado Sehat",
    category: "Healthy Food",
    categoryId: 5,
    price: 18000,
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2e5c1?w=500&auto=format&fit=crop&q=60",
  },
];

const foodImageById = {
  54: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700&auto=format&fit=crop&q=85",
  55: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=85",
  56: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85",
  57: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=700&auto=format&fit=crop&q=85",
  58: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=700&auto=format&fit=crop&q=85",
  59: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=85",
  60: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=85",
  61: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=85",
};

function FoodOrder() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [foods, setFoods] = useState(fallbackFoods);
  const [categories, setCategories] = useState([]);
  const [menuError, setMenuError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const formik = useFormik({
    initialValues: {
      search: "",
      category: "",
      sortBy: "",
    },
    onSubmit: (values) => {
      console.log("Filter diterapkan:", values);
    },
  });

  const { search, category, sortBy } = formik.values;
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const fallbackCategories = useMemo(
    () => Array.from(new Map(fallbackFoods.map((food) => [food.categoryId, food.category])).entries())
      .map(([value, label]) => ({ value: String(value), label })),
    [],
  );

  useEffect(() => {
    foodApi.getCategories()
      .then((response) => {
        const categoryData = response.data.data || response.data || [];
        setCategories(categoryData.map((item) => ({
          value: String(item.id),
          label: item.categoryName || item.name,
        })));
      })
      .catch(() => setCategories(fallbackCategories));
  }, [fallbackCategories]);

  useEffect(() => {
    const params = { pageSize: 100 };
    if (search.trim()) params.foodName = search.trim();
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy === "price-asc" ? "price,asc" : "price,desc";

    foodApi.getFoods(params)
      .then((response) => {
        const apiFoods = response.data.data || [];
        setFoods(apiFoods.map((food) => ({
          ...food,
          category: food.category || categories.find((item) => item.value === String(food.categoryId))?.label || "Food",
          rating: food.rating || 4.8,
          available: food.available ?? true,
          image: food.image || foodImageById[food.id] || fallbackFoods.find((item) => item.name === food.name)?.image || fallbackFoods.find((item) => item.id === food.id)?.image || fallbackFoods[0].image,
        })));
        setMenuError("");
      })
      .catch(() => {
        setMenuError("Menu dari server tidak dapat dimuat.");
        setFoods(fallbackFoods);
      });
  }, [category, categories, search, sortBy]);

  useEffect(() => {
    foodApi.getCart()
      .then((response) => setCartItems(response.data.data || []))
      .catch(() => setCartItems([]));
  }, []);

  const categoryOptions = [
    { value: "", label: "Kategori" },
    ...(categories.length ? categories : fallbackCategories),
  ];
  const searchTerm = search.trim().toLowerCase();

  const filteredFoods = foods
    .filter((food) =>
      `${food.name} ${food.category}`.toLowerCase().includes(searchTerm),
    )
    .filter((food) => (category ? String(food.categoryId) === category || food.category === category : true));
  const sortedFoods = [...filteredFoods]
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = async (food) => {
    try {
      await foodApi.addToCart(food.id);
      const response = await foodApi.getCart();
      setCartItems(response.data.data || []);
      setCartMessage(`${food.name} berhasil ditambahkan ke keranjang.`);
    } catch (err) {
      setCartMessage(err.response?.data?.message || "Gagal menambahkan menu ke keranjang.");
    }
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
    "& .MuiSelect-select": { color: isDark ? "#fff" : undefined },
    "& .MuiSvgIcon-root": { color: isDark ? "#aaa" : undefined },
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: { xs: 2, md: 7 }, paddingBottom: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: isDark ? "#1E1E1E" : "#fff8f2",
          border: isDark ? "1px solid #2E2E2E" : "1px solid #f0e0d6",
          borderRadius: "18px",
          padding: { xs: 3, sm: 5, md: 6 },
          textAlign: "center",
          boxShadow: isDark
            ? "0 8px 24px rgba(0,0,0,0.35)"
            : "0 4px 14px rgba(31,20,80,0.05), 0 24px 48px rgba(31,20,80,0.08)",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, fontSize: { xs: "2.1rem", md: "3.3rem" }, color: isDark ? "#fff" : "#ff7417" }}
        >
          Discover Delicious Food
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: 650, mx: "auto", color: isDark ? "#d0cbdc" : "#2f2b2a", marginBottom: 3.5, fontWeight: 400 }}
        >
          Explore our carefully curated menu and find your next favorite meal tailored just for you.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="search"
            placeholder="Search for food..."
            value={search}
            onChange={formik.handleChange}
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: isDark ? "#888" : "#B3AFC9" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 680,
              margin: "0 auto 2rem",
              ...fieldSx,
              "& .MuiOutlinedInput-input": {
                color: isDark ? "#fff" : "#242020",
                "&::placeholder": { color: isDark ? "#aaa" : "#8b8793", opacity: 1 },
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", maxWidth: 680, mx: "auto", justifyContent: "flex-start" }}>
            <Select
              displayEmpty
              name="category"
              value={category}
              onChange={formik.handleChange}
              size="small"
              sx={{ minWidth: 156, maxWidth: 160, ...fieldSx }}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value || "all"} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              displayEmpty
              name="sortBy"
              value={sortBy}
              onChange={formik.handleChange}
              size="small"
              sx={{ minWidth: 156, maxWidth: 160, ...fieldSx }}
            >
              <MenuItem value="">Urutkan Harga</MenuItem>
              <MenuItem value="price-asc">Harga Terendah</MenuItem>
              <MenuItem value="price-desc">Harga Tertinggi</MenuItem>
            </Select>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 2.5, fontWeight: 800, color: isDark ? "#fff" : "#242020" }}>
        Our Menu
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", position: "relative", mb: 1 }}>
        <IconButton
          aria-label="Buka keranjang"
          onClick={() => setShowCart((current) => !current)}
          sx={{ color: isDark ? "#fff" : "#242020" }}
        >
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {showCart && (
          <Paper sx={{ position: "absolute", top: 48, right: 0, zIndex: 3, width: 280, p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Keranjang</Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body2">Keranjang masih kosong.</Typography>
            ) : cartItems.map((item) => (
              <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", gap: 1, py: 0.75 }}>
                <Typography variant="body2">{item.foodName}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>x{item.quantity}</Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
      {menuError && <Typography color="warning.main" sx={{ marginBottom: 2 }}>{menuError}</Typography>}
      <Typography sx={{ color: isDark ? "#aaa" : "#777", marginBottom: 2 }}>
        Menampilkan {filteredFoods.length} menu
        {searchTerm ? ` untuk "${search}"` : ""}
      </Typography>
      {cartMessage && (
        <Typography sx={{ color: cartMessage.startsWith("Gagal") ? "error.main" : "success.main", marginBottom: 2 }}>
          {cartMessage}
        </Typography>
      )}

      <Grid container spacing={3} sx={{ marginTop: 1, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(5, minmax(0, 1fr))" } }}>
        {sortedFoods.map((food) => (
          <Grid item key={food.id} sx={{ minWidth: 0 }}>
            <FoodCard
              image={food.image}
              category={food.category}
              name={food.name}
              price={food.price}
              rating={food.rating}
              available={food.available}
              onAddToCart={() => handleAddToCart(food)}
            />
          </Grid>
        ))}
      </Grid>

      {filteredFoods.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            marginTop: 4,
            color: isDark ? "#9B96B0" : "#8B87A3",
          }}
        >
          Tidak ada makanan yang cocok dengan pencarianmu.
        </Typography>
      )}
    </Container>
  );
}

export default FoodOrder;