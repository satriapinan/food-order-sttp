import { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import api from "../services/api";

const FALLBACK_FOODS = [
  {
    id: 1,
    name: "Nasi Goreng Special",
    price: 25000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Mie Ayam Jamur",
    price: 20000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Gado-Gado Surabaya",
    price: 18000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Steak Ayam BBQ",
    price: 45000,
    category: "Western Food",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Ramen Shoyu",
    price: 38000,
    category: "Asian Food",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Es Krim Vanilla",
    price: 15000,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Sate Ayam Madura",
    price: 30000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Es Teh Manis",
    price: 5000,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80"
  }
];

function FoodMenuPage() {
  const [foods, setFoods] = useState(FALLBACK_FOODS);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Integrasi Formik & Yup sesuai Kriteria 4
  const formik = useFormik({
    initialValues: {
      search: "",
      category: "All",
      sortBy: "default",
    },
    validationSchema: Yup.object({
      search: Yup.string().max(50, "Maksimal 50 karakter"),
      category: Yup.string(),
      sortBy: Yup.string(),
    }),
    onSubmit: () => {},
  });

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await api.get("/food-order/foods");
      const data = res.data?.data?.foods || res.data?.data || res.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setFoods(data);
      } else {
        setFoods(FALLBACK_FOODS);
      }
    } catch (err) {
      console.error("Gagal mengambil data dari API, menggunakan fallback data:", err);
      setFoods(FALLBACK_FOODS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAddToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Pesanan berhasil dibuat!");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Filter & Sorting berbasis Formik Values
  const filteredFoods = useMemo(() => {
    let result = [...foods];

    const { search, category, sortBy } = formik.values;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((item) => item.name.toLowerCase().includes(q));
    }

    if (category !== "All") {
      result = result.filter((item) => {
        const catName = typeof item.category === "object" ? item.category?.name : item.category;
        return catName === category;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name, "id", { sensitivity: "base" });
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name, "id", { sensitivity: "base" });
      }
      if (sortBy === "price-low") {
        return Number(a.price) - Number(b.price);
      }
      if (sortBy === "price-high") {
        return Number(b.price) - Number(a.price);
      }
      return 0;
    });

    return result;
  }, [foods, formik.values]);

  return (
    <Container maxWidth="lg" sx={{ py: 6, position: "relative" }}>
      {/* Floating Cart Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton color="primary" onClick={() => setIsCartOpen(true)} size="large">
          <Badge badgeContent={totalCartCount} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      {/* FILTER & SEARCH HEADER */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
          Menu Makanan
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Temukan hidangan lezat khusus untuk Anda.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <AppInput
                label="Mencari makanan..."
                type="text"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.search && Boolean(formik.errors.search)}
                helperText={formik.touched.search && formik.errors.search}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                select
                label="Kategori"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="All">Semua Kategori</MenuItem>
                <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
                <MenuItem value="Western Food">Western Food</MenuItem>
                <MenuItem value="Asian Food">Asian Food</MenuItem>
                <MenuItem value="Desserts">Desserts</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                select
                label="Urutkan Berdasarkan"
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="name-asc">Nama: A - Z</MenuItem>
                <MenuItem value="name-desc">Nama: Z - A</MenuItem>
                <MenuItem value="price-low">Harga: Terendah</MenuItem>
                <MenuItem value="price-high">Harga: Tertinggi</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={1}>
              <AppButton
                type="button"
                variant="outlined"
                onClick={() => formik.resetForm()}
                fullWidth
                sx={{ py: 1.8 }}
              >
                RESET
              </AppButton>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* LIST MAKANAN */}
      {loading ? (
        <Typography align="center" sx={{ py: 4 }}>Memuat data menu...</Typography>
      ) : filteredFoods.length > 0 ? (
        <Grid container spacing={3}>
          {filteredFoods.map((food) => (
            <Grid item key={food.id || food._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={food.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                  alt={food.name}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Chip
                    label={typeof food.category === "object" ? food.category?.name : food.category || "General"}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1, fontSize: "0.7rem", fontWeight: "bold" }}
                  />
                  <Typography variant="h6" fontWeight="bold" fontSize="1rem" gutterBottom>
                    {food.name}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                    Rp. {Number(food.price || 0).toLocaleString("id-ID")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <AppButton onClick={() => handleAddToCart(food)} fullWidth>
                    TAMBAHKAN KE KERANJANG
                  </AppButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="text.secondary">Makanan tidak ditemukan.</Typography>
        </Box>
      )}

      {/* DRAWER KERANJANG */}
      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Box sx={{ width: 360, p: 3 }} role="presentation">
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Keranjang Belanja
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {cartItems.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              Keranjang kamu kosong.
            </Typography>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <Box key={item.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton color="error" onClick={() => handleRemoveFromCart(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`Rp. ${Number(item.price).toLocaleString("id-ID")}`}
                      />
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, -1)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1, fontWeight: "bold" }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Pembayaran:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Rp. {totalCartPrice.toLocaleString("id-ID")}
                </Typography>
              </Box>

              <AppButton onClick={handleCheckout} fullWidth size="large">
                Checkout
              </AppButton>
            </>
          )}
        </Box>
      </Drawer>

      {/* FOOTER */}
      <Paper elevation={3} sx={{ p: 2.5, mt: 4, borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Menampilkan {filteredFoods.length} dari {foods.length} item
        </Typography>
        <Pagination count={1} color="primary" />
      </Paper>
    </Container>
  );
}

export default FoodMenuPage;