import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FoodCard from "../components/FoodCard";

const foods = [
  { id: 1, name: "Nama Makanan 1", category: "Kategori", price: 0, available: true, image: "" },
  { id: 2, name: "Nama Makanan 2", category: "Kategori", price: 0, available: true, image: "" },
  { id: 3, name: "Nama Makanan 3", category: "Kategori", price: 0, available: true, image: "" },
  { id: 4, name: "Nama Makanan 4", category: "Kategori", price: 0, available: true, image: "" },
];

function FoodMenu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredFoods = foods
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .filter((f) => (category ? f.category === category : true))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (food) => {
    console.log("Ditambahkan ke keranjang:", food.name);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6D5BD0, #8E7CF0)",
        minHeight: "100vh",
        paddingBottom: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ backgroundColor: "#fff", borderRadius: "16px", padding: 4, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#2E2A47" }}>
            Food Menu
          </Typography>
          <Typography variant="body2" sx={{ color: "#8B87A3", marginBottom: 3 }}>
            Discover delicious meals just for you
          </Typography>

          <TextField
            fullWidth
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Select
              displayEmpty
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">Kategori</MenuItem>
              <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
              <MenuItem value="Western Food">Western Food</MenuItem>
              <MenuItem value="Asian Food">Asian Food</MenuItem>
            </Select>

            <Select
              displayEmpty
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">Sort By</MenuItem>
              <MenuItem value="price-asc">Harga Terendah</MenuItem>
              <MenuItem value="price-desc">Harga Tertinggi</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Grid makanan */}
        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          {filteredFoods.map((food) => (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={food.id}>
              <FoodCard
                image={food.image}
                category={food.category}
                name={food.name}
                price={food.price}
                available={food.available}
                onAddToCart={() => handleAddToCart(food)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FoodMenu;