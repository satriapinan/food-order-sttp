/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  Typography, 
  TextField, 
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import Grid from "@mui/material/Grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// IMPORT KOMPONEN TOMBOL
import AppButton from "../components/AppButton"; 

const foodData = [
  { id: 1, category: "Indonesian Food", name: "Nasi Goreng", price: "Rp. 25.000" },
  { id: 2, category: "Indonesian Food", name: "Mie Ayam", price: "Rp. 20.000" },
  { id: 3, category: "Western Food", name: "Ayam Bakar", price: "Rp. 35.000" },
  { id: 4, category: "Asian Food", name: "Gado-Gado", price: "Rp. 18.000" },
  { id: 5, category: "Desserts", name: "Es Krim Vanilla", price: "Rp. 15.000" },
];

function MenuPages() {
  const navigate = useNavigate(); // Berjaga-jaga kalau Boss butuh navigasi nantinya
  
  // Dropdown
  const [kategori, setKategori] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        // Warna background biru
        backgroundColor: "#3C6AE9", 
        padding: { xs: 2, md: 5 } 
      }}
    >
      {/* 1. BAGIAN HEADER (Judul, Search Bar, & Filter) */}
      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, borderRadius: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#548394", mb: 0.5 }}>
          Food Menu
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
          Discover delicious meals just for you
        </Typography>

        {/* Search Field */}
        <TextField 
          fullWidth 
          size="small"
          placeholder="Search for food..." 
          variant="outlined" 
          sx={{ mb: 2 }}
        />

        {/* Dropdown Kategori & Sort By */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={kategori}
              label="Kategori"
              onChange={(e) => setKategori(e.target.value)}
            >
              <MenuItem value="indo">Indonesian</MenuItem>
              <MenuItem value="western">Western</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* 2. BAGIAN GRID DAFTAR MAKANAN */}
      <Box sx={{ maxWidth: 1000, margin: "0 auto" }}>
        <Grid container spacing={3} justifyContent="center">
          
          {/* data array menjadi barisan Card */}
          {foodData.map((item) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                
                {/* Gambar Placeholder  */}
                <CardMedia
                component="img"
                height="140"
                // Link gmbr
                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300&auto=format&fit=crop"
                alt={item.name}
                />
                
                <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                  {/* Badge Label Kategori */}
                  <Box 
                    sx={{ 
                      backgroundColor: "#E4F0F6", 
                      color: "#548394", 
                      display: "inline-block", 
                      padding: "4px 8px", 
                      borderRadius: "12px", 
                      fontSize: "10px",
                      fontWeight: "bold",
                      mb: 1 
                    }}
                  >
                    {item.category}
                  </Box>
                  
                  {/* Nama dan Harga Makanan */}
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#548394", fontWeight: "bold", mb: 2 }}>
                    {item.price}
                  </Typography>

                  {/* Bintang dan Ketersediaan */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <StarBorderIcon fontSize="small" sx={{ color: "#BDBDBD" }} />
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>
                      Available
                    </Typography>
                  </Box>

                  {/* Menggunakan AppButton! */}
                  <AppButton>
                    Add to Cart
                  </AppButton>
                </CardContent>

              </Card>
            </Grid>
          ))}
          
        </Grid>
      </Box>
    </Box>
  );
}

export default MenuPages;