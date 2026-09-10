import { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import AppSnackbar from '../components/AppSnackbar';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useThemes';

const images = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

const foodData = [
  { id: 1, name: "Nasi Goreng", price: 25000, priceFormatted: "25.000", category: "Indonesian Food", imgName: "nasi-goreng.jpg" },
  { id: 2, name: "Mie Ayam", price: 20000, priceFormatted: "20.000", category: "Indonesian Food", imgName: "Mie-Ayam.png" },
  { id: 3, name: "Ayam Bakar", price: 35000, priceFormatted: "35.000", category: "Indonesian Food", imgName: "Ayam-bakar.png" },
  { id: 4, name: "Gado-Gado", price: 18000, priceFormatted: "18.000", category: "Asean Food", imgName: "Gado-gado.png" },
  { id: 5, name: "Es Krim Vanila", price: 15000, priceFormatted: "15.000", category: "Desserts", imgName: "ice-vanila.png" }
];

export default function BerandaPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode } = useTheme();
  const isDark = mode === "dark";

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  // Filter and sort food list
  const filteredFoods = useMemo(() => {
    return foodData
      .filter((food) => {
        const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? food.category === category : true;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "Termurah") return a.price - b.price;
        if (sortBy === "Termahal") return b.price - a.price;
        if (sortBy === "A-Z") return a.name.localeCompare(b.name);
        if (sortBy === "Z-A") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [search, category, sortBy]);

  // Cart handlers
  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === food.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
    showNotification(`"${food.name}" ditambahkan ke keranjang!`, "success");
  };

  const handleUpdateQuantity = (foodId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== foodId));
    showNotification("Item dihapus dari keranjang", "info");
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]);
    setIsCartOpen(false);
    showNotification("Pesanan Anda berhasil dibuat! Terima kasih.", "success");
  };

  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: isDark ? "#0f172a" : "#e0f7fa", pb: 6 }}>
      {/* Header Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: isDark ? "#1e293b" : "#062630", elevation: 4 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RestaurantMenuIcon sx={{ color: "#30e8f5", fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Food Order
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
              <Badge badgeContent={totalCartItems} color="error">
                <ShoppingCartIcon sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>

            {user ? (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  logout();
                  navigate("/masuk");
                }}
                sx={{ borderRadius: 2 }}
              >
                Keluar ({user.fullname || user.username || "User"})
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/masuk")}
                sx={{ backgroundColor: "#30e8f5", color: "#062630", fontWeight: "bold", "&:hover": { backgroundColor: "#80deea" } }}
              >
                Masuk
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Search & Filter Card */}
        <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 3, backgroundColor: isDark ? "#1e293b" : "#ffffff" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: isDark ? "#38bdf8" : "#062630", textAlign: "center", mb: 1 }}>
            Jelajahi Menu Makanan Lezat
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
            Cari, filter berdasarkan kategori, dan pesan makanan favoritmu sekarang!
          </Typography>

          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Cari makanan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ backgroundColor: isDark ? "#0f172a" : "#f8fafc", borderRadius: 1 }}
              />
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  sx={{ backgroundColor: isDark ? "#0f172a" : "#f8fafc" }}
                >
                  <MenuItem value="">Semua Kategori</MenuItem>
                  <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
                  <MenuItem value="Asean Food">Asean Food</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort By Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{ backgroundColor: isDark ? "#0f172a" : "#f8fafc" }}
                >
                  <MenuItem value="">Urutkan (Default)</MenuItem>
                  <MenuItem value="Termurah">Harga: Termurah</MenuItem>
                  <MenuItem value="Termahal">Harga: Termahal</MenuItem>
                  <MenuItem value="A-Z">Nama: A - Z</MenuItem>
                  <MenuItem value="Z-A">Nama: Z - A</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reset Button */}
            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setSortBy("");
                }}
                sx={{ height: 40 }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Food Menu Grid */}
        {filteredFoods.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Makanan tidak ditemukan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coba gunakan kata kunci pencarian atau filter yang lain.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredFoods.map((food) => {
              const imageSrc = images[`../assets/${food.imgName}`]?.default;
              const cartItem = cart.find((item) => item.id === food.id);

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imageSrc}
                      alt={food.name}
                      height="160"
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />

                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={food.category}
                          size="small"
                          sx={{
                            backgroundColor: "#d9f1f7",
                            color: "#0245aa",
                            fontWeight: "bold",
                            fontSize: "11px",
                          }}
                        />
                      </Box>

                      <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        {food.name}
                      </Typography>

                      <Typography variant="body1" sx={{ color: "#0754ac", fontWeight: "bold", my: 1, mt: "auto" }}>
                        Rp {food.priceFormatted}
                      </Typography>

                      <Button
                        onClick={() => handleAddToCart(food)}
                        fullWidth
                        variant="contained"
                        startIcon={cartItem ? <CheckCircleIcon /> : <ShoppingCartIcon />}
                        sx={{
                          mt: 2,
                          backgroundColor: cartItem ? "#16a34a" : "#062630",
                          color: "#fff",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: cartItem ? "#15803d" : "#0e3a46",
                          },
                        }}
                      >
                        {cartItem ? `Di Keranjang (${cartItem.quantity})` : "Pesan"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* Shopping Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Box sx={{ width: { xs: 320, sm: 400 }, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Cart Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingCartIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Keranjang Belanja
              </Typography>
            </Box>
            <IconButton onClick={() => setIsCartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 70, color: "text.disabled", mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                Keranjang kamu masih kosong
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ flexGrow: 1, overflowY: "auto" }}>
                {cart.map((item) => {
                  const itemImg = images[`../assets/${item.imgName}`]?.default;

                  return (
                    <Box key={item.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" color="error" onClick={() => handleRemoveFromCart(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                        sx={{ px: 0 }}
                      >
                        <ListItemAvatar>
                          <Avatar src={itemImg} alt={item.name} variant="rounded" sx={{ width: 50, height: 50, mr: 1 }} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>}
                          secondary={
                            <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                              Rp {item.priceFormatted}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, pl: 7 }}>
                        <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: 1 }}>
                          <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, -1)}>
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ px: 1.5, fontWeight: "bold", fontSize: "14px" }}>
                            {item.quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, 1)}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  );
                })}
              </List>

              {/* Cart Footer */}
              <Box sx={{ pt: 2, borderTop: "2px solid #e2e8f0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography color="text.secondary">Total Item</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{totalCartItems} porsi</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total Harga
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                    Rp {totalCartPrice.toLocaleString("id-ID")}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleCheckout}
                  sx={{
                    backgroundColor: "#062630",
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": { backgroundColor: "#0e3a46" },
                  }}
                >
                  Checkout Sekarang
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Snackbar Alert */}
      <AppSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}