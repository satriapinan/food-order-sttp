import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

// Import gambar lokal
import imgCenil from "../assets/cenil.jpg";
import imgDadarGulung from "../assets/dadar gulung.png";
import imgSateLilit from "../assets/sate lilit.jpg";
import imgSerabi from "../assets/serabi.jpg";

// Data Menu Makanan
const menuList = [
  {
    id: 1,
    nama: "Dadar Gulung",
    kategori: "Traditional Snack",
    harga: 15000,
    status: "Available",
    image: imgDadarGulung,
  },
  {
    id: 2,
    nama: "Serabi Solo",
    kategori: "Traditional Snack",
    harga: 18000,
    status: "Available",
    image: imgSerabi,
  },
  {
    id: 3,
    nama: "Sate Cenil",
    kategori: "Dessert",
    harga: 12000,
    status: "Available",
    image: imgCenil,
  },
  {
    id: 4,
    nama: "Sate Lilit Bali",
    kategori: "Indonesian Food",
    harga: 32000,
    status: "Available",
    image: imgSateLilit,
  },
];

export default function FoodMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  
  // State untuk mode tema lokal
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const filteredMenu = menuList
    .filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = category === "All" || item.kategori === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.harga - b.harga;
      if (sortBy === "high") return b.harga - a.harga;
      return 0;
    });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: isDarkMode ? "#121212" : "#4db6ac",
          py: 5,
          px: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          {/* BARIS TOMBOL TEMA DI POJOK KANAN */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              onClick={toggleTheme}
              sx={{
                backgroundColor: isDarkMode ? "#ffffff" : "#26a69a",
                color: isDarkMode ? "#121212" : "#ffffff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#e0e0e0" : "#00897b",
                },
              }}
            >
              {isDarkMode ? "LIGHT MODE ☀️" : "DARK MODE 🌙"}
            </Button>
          </Box>

          {/* HEADER */}
          <Box sx={{ textAlign: "center", mb: 4, color: "white" }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
              Food Menu
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Discover delicious meals just for you
            </Typography>
          </Box>

          {/* FILTER & SEARCH */}
          <Box
            sx={{
              backgroundColor: isDarkMode ? "#1e1e1e" : "#e0f2f1",
              p: 3,
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              mb: 5,
            }}
          >
            <Grid container spacing={2}>
              {/* SEARCH BAR */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Search for food..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        🔍
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "12px",
                      backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
                      color: isDarkMode ? "#ffffff" : "inherit",
                    },
                  }}
                />
              </Grid>

              {/* KATEGORI */}
              <Grid item xs={6} sm={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{
                    backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
                    borderRadius: "12px",
                    "& .MuiSelect-select": {
                      color: isDarkMode ? "#ffffff" : "inherit",
                    },
                  }}
                >
                  <MenuItem value="All">Semua Kategori</MenuItem>
                  <MenuItem value="Traditional Snack">Traditional Snack</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
                </TextField>
              </Grid>

              {/* SORT BY */}
              <Grid item xs={6} sm={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    backgroundColor: isDarkMode ? "#2c2c2c" : "#ffffff",
                    borderRadius: "12px",
                    "& .MuiSelect-select": {
                      color: isDarkMode ? "#ffffff" : "inherit",
                    },
                  }}
                >
                  <MenuItem value="default">Sort By</MenuItem>
                  <MenuItem value="low">Harga Terendah</MenuItem>
                  <MenuItem value="high">Harga Tertinggi</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          {/* MENU GRID CARD */}
          <Grid container spacing={3}>
            {filteredMenu.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "inherit",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, background-color 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.nama}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent sx={{ textAlign: "center", p: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: isDarkMode ? "#80cbd2" : "#4db6ac", fontWeight: "bold", display: "block", mb: 0.5 }}
                    >
                      {item.kategori}
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: "bold", color: isDarkMode ? "#fff" : "#333", mb: 0.5 }}>
                      {item.nama}
                    </Typography>

                    <Typography variant="body1" sx={{ color: isDarkMode ? "#ccc" : "#666", fontWeight: "600", mb: 2 }}>
                      Rp. {item.harga.toLocaleString("id-ID")}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 1,
                        borderTop: isDarkMode ? "1px solid #333" : "1px solid #f0f0f0",
                      }}
                    >
                      <span>☆</span>
                      <Typography variant="caption" sx={{ color: isDarkMode ? "#aaa" : "#888", fontWeight: "500" }}>
                        {item.status}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}