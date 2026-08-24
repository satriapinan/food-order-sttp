import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  InputAdornment,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import FoodCard from "../components/FoodCard";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await api.get("/food-order/foods/cart");
      setCart(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
  });

  const { search, category, sortBy } = formik.values;

  useEffect(() => {
    api.get("/food-order/categories").then((res) => {
      setCategories(res.data?.data || []);
    });
    fetchCart();
  }, []);

  useEffect(() => {
    const params = { pageSize: 100 };

    if (search) params.foodName = search;
    if (category) params.categoryId = category;
    if (sortBy) params.sortBy = sortBy;

    api.get("/food-order/foods", { params }).then((res) => {
      setFoods(res.data?.data || []);
    });
  }, [search, category, sortBy]);

  const handleAddToCart = (foodId) => {
    const food = foods.find(f => f.id === foodId);
    const foodName = food ? food.name : "Menu";

    if (food) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === foodId);
        if (existingItem) {
          // Jika sudah ada di keranjang, tambah jumlahnya
          return prevCart.map(item => 
            item.id === foodId 
              ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
              : item
          );
        } else {
          // Jika belum ada, tambahkan sebagai data baru
          return [...prevCart, { 
            id: food.id, 
            foodName: food.name, 
            price: food.price, 
            quantity: 1, 
            totalPrice: food.price 
          }];
        }
      });
      alert(`${foodName} ditambahkan ke keranjang!`);
    }
  };

  const categoryOptions = useMemo(() => {
    return [
      { value: "", label: "Semua Kategori" },
      ...categories.map((c) => ({
        value: String(c.id),
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  const sortOptions = [
    { value: "", label: "Relevansi" },
    { value: "name_asc", label: "Nama A-Z" },
    { value: "price_asc", label: "Harga Terendah" },
    { value: "price_desc", label: "Harga Tertinggi" }
  ];

  return (
    <Box sx={{ py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        {/* User Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Halo, <Typography component="span" variant="h6" color="primary.main" fontWeight="bold">{user?.fullname || user?.username || "Guest"}</Typography> 👋
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="contained" onClick={() => setIsCartOpen(true)} sx={{ borderRadius: 8 }}>
              🛒 Keranjang ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </Button>
            <Button variant="outlined" color="error" size="small" onClick={handleLogout} sx={{ borderRadius: 8 }}>
              Logout
            </Button>
          </Box>
        </Box>

        {/* Premium Hero Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            mb: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.02) 100%)',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, letterSpacing: '-0.5px' }}>
              Discover Delicious Food
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 5, fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
              Explore our carefully curated menu and find your next favorite meal tailored just for you.
            </Typography>

            <Box sx={{ maxWidth: 700, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder="What are you craving today?"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
                variant="outlined"
                sx={{
                  mb: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  }
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#666' }}>
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </InputAdornment>
                    ),
                  }
                }}
              />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <FormControl sx={{ minWidth: 160, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <InputLabel id="category-label">Kategori</InputLabel>
                  <Select
                    labelId="category-label"
                    label="Kategori"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    sx={{ borderRadius: 2 }}
                  >
                    {categoryOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.value === "" ? <em>{opt.label}</em> : opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <InputLabel id="sort-label">Urutkan</InputLabel>
                  <Select
                    labelId="sort-label"
                    label="Urutkan"
                    name="sortBy"
                    value={formik.values.sortBy}
                    onChange={formik.handleChange}
                    sx={{ borderRadius: 2 }}
                  >
                    {sortOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.value === "" ? <em>{opt.label}</em> : opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Our Menu
        </Typography>

        {/* Grid of Foods */}
        <Grid container spacing={3}>
          {foods.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <FoodCard
                id={item.id}
                title={item.name}
                price={`Rp ${item.price?.toLocaleString('id-ID')}`}
                category={item.categories?.categoryName || "Uncategorized"}
                image={item.image || `/img/menu${(index % 5) + 1}.jpg`}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          ))}
          {foods.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Maaf, makanan tidak ditemukan.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Box sx={{ width: { xs: 300, sm: 380 }, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Keranjang Belanja 🛒
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
                Keranjangmu masih kosong. Yuk tambah makanan!
              </Typography>
            ) : (
              <List>
                {cart.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                    <ListItemText
                      primary={<Typography fontWeight="bold">{item.foodName}</Typography>}
                      secondary={`Rp ${item.price?.toLocaleString("id-ID")} x ${item.quantity}`}
                    />
                    <Typography fontWeight="bold" color="primary.main">
                      Rp {item.totalPrice?.toLocaleString("id-ID")}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          
          {cart.length > 0 && (
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Total Pembayaran</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  Rp {cart.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString("id-ID")}
                </Typography>
              </Box>
              <Button variant="contained" fullWidth size="large" onClick={() => {
                 alert("Fitur Checkout akan segera hadir!"); 
                 setIsCartOpen(false);
              }}>
                Checkout Sekarang
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}

export default DashboardPage;
