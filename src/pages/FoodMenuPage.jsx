import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

// Data Dummy Makanan
const DUMMY_FOODS = [
  {
    id: 1,
    name: "Nasi Goreng Special",
    price: 25000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
    status: "Available",
  },
  {
    id: 2,
    name: "Mie Ayam Jamur",
    price: 20000,
    category: "Indonesian Food",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    status: "Available",
  },
  {
    id: 3,
    name: "Ayam Bakar Madu",
    price: 35000,
    category: "Western Food",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&q=80",
    status: "Available",
  },
  {
    id: 4,
    name: "Gado-Gado Surabaya",
    price: 18000,
    category: "Asian Food",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    status: "Available",
  },
  {
    id: 5,
    name: "Es Krim Vanilla",
    price: 15000,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=500&q=80",
    status: "Available",
  },
];

function FoodMenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Logika Filter & Search
  const filteredFoods = DUMMY_FOODS.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (foodName) => {
    alert(`${foodName} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* SECTION SEARCH & FILTER HEADER */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 4,
          borderRadius: 3,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          color="primary"
        >
          Food Menu
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Discover delicious meals just for you
        </Typography>

        <Grid container spacing={2} alignItems="center">
          {/* AppInput untuk Search */}
          <Grid item xs={12} md={6}>
            <AppInput
              label="Search for food..."
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          {/* Filter Kategori */}
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ mt: 2 }}
            >
              <MenuItem value="All">Semua Kategori</MenuItem>
              <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
              <MenuItem value="Western Food">Western Food</MenuItem>
              <MenuItem value="Asian Food">Asian Food</MenuItem>
              <MenuItem value="Desserts">Desserts</MenuItem>
            </TextField>
          </Grid>

          {/* Sort By */}
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ mt: 2 }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-low">Harga: Terendah</MenuItem>
              <MenuItem value="price-high">Harga: Tertinggi</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION LIST CARD MAKANAN */}
      <Grid container spacing={3}>
        {filteredFoods.map((food) => (
          <Grid item key={food.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 14px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={food.image}
                alt={food.name}
              />

              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Chip
                  label={food.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1, fontSize: "0.7rem", fontWeight: "bold" }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize="1rem"
                  gutterBottom
                >
                  {food.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Rp. {food.price.toLocaleString("id-ID")}
                </Typography>
                <Typography
                  variant="caption"
                  color="success.main"
                  display="block"
                  sx={{ mt: 1 }}
                >
                  ● {food.status}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <AppButton onClick={() => handleAddToCart(food.name)}>
                  Add to Cart
                </AppButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FOOTER & PAGINATION */}
      <Paper
        elevation={3}
        sx={{
          p: 2.5,
          mt: 4,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing 1-{filteredFoods.length} of {DUMMY_FOODS.length} items
        </Typography>
        <Pagination count={1} color="primary" />
      </Paper>
    </Container>
  );
}

export default FoodMenuPage;