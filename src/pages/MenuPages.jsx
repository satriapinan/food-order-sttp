import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

// Import komponen FoodCard
import FoodCard from "../components/FoodCard"; 

const foodData = [
  { id: 1, category: "Indonesian Food", name: "Nasi Goreng", price: "Rp. 25.000" },
  { id: 2, category: "Indonesian Food", name: "Mie Ayam", price: "Rp. 20.000" },
  { id: 3, category: "Western Food", name: "Ayam Bakar", price: "Rp. 35.000" },
  { id: 4, category: "Asian Food", name: "Gado-Gado", price: "Rp. 18.000" },
  { id: 5, category: "Desserts", name: "Es Krim Vanilla", price: "Rp. 15.000" },
];

function MenuPages() {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Pengecekan Local Storage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Boss harus login dulu ya!");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    // Backg
    <Box sx={{ padding: { xs: 2, md: 5 } }}>
      
      {/* Tombol Logout */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* HEADER */}
      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, borderRadius: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#548394", mb: 0.5 }}>
          Food Menu
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
          Discover delicious meals just for you
        </Typography>

        <TextField fullWidth size="small" placeholder="Search for food..." variant="outlined" sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Kategori</InputLabel>
            <Select value={kategori} label="Kategori" onChange={(e) => setKategori(e.target.value)}>
              <MenuItem value="indo">Indonesian</MenuItem>
              <MenuItem value="western">Western</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* GRID DAFTAR MAKANAN */}
      <Box sx={{ maxWidth: 1000, margin: "0 auto" }}>
        <Grid container spacing={3} justifyContent="center">
          {foodData.map((item) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <FoodCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MenuPages;