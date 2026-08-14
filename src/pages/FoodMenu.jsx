import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Grid,
  IconButton,
  Button,
  Chip,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import nasiGorengImg from "../assets/Nasi_Goreng.jpg";
import mieAyamImg from "../assets/mie_ayam.jpg";
import ayamBakarImg from "../assets/Ayam_Bakar.jpg";
import gadoGadoImg from "../assets/gado-gado.jpeg";

const INITIAL_FOODS = [
  {
    id: 1,
    name: "Nasi Goreng",
    category: "Makanan Indonesia",
    price: 25000,
    isAvailable: true,
    isFavorite: false,
    image: nasiGorengImg,
  },
  {
    id: 2,
    name: "Mie Ayam",
    category: "Makanan Indonesia",
    price: 20000,
    isAvailable: true,
    isFavorite: false,
    image: mieAyamImg,
  },
  {
    id: 3,
    name: "Ayam Bakar",
    category: "Makanan Barat",
    price: 35000,
    isAvailable: true,
    isFavorite: false,
    image: ayamBakarImg,
  },
  {
    id: 4,
    name: "Gado-Gado",
    category: "Makanan Asia",
    price: 18000,
    isAvailable: true,
    isFavorite: false,
    image: gadoGadoImg,
  },
];

export default function FoodMenuPage() {
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Status/state untuk notifikasi Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Mengubah status favorit (suka/bintang)
  const handleToggleFavorite = (id) => {
    setFoods((prevFoods) =>
      prevFoods.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Penanganan klik tombol tambah ke keranjang
  const handleAddToCart = (name) => {
    setSnackbarMessage(`${name} berhasil ditambahkan ke keranjang belanja!`);
    setSnackbarOpen(true);
  };

  // Memproses daftar makanan (pencarian, penyaringan kategori, pengurutan)
  const processedFoods = useMemo(() => {
    let result = [...foods];

    // Filter berdasarkan kata kunci pencarian
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Filter berdasarkan kategori
    if (categoryFilter !== "All") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Pengurutan
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [foods, searchQuery, categoryFilter, sortBy]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerWrapper}>

        {/* Kontainer Kartu Header Atas */}
        <Box sx={styles.headerCard}>
          <Typography component="h1" variant="h3" sx={styles.headerTitle}>
            Menu Makanan
          </Typography>
          <Typography variant="body1" sx={styles.headerSubtitle}>
            Temukan makanan lezat khusus untuk Anda
          </Typography>

          <TextField
            placeholder="Cari makanan..."
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#c2185b" }} />
                </InputAdornment>
              ),
            }}
            sx={styles.searchField}
          />

          <Box sx={styles.filtersRow}>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              displayEmpty
              sx={styles.selectFilter}
            >
              <MenuItem value="All">Kategori</MenuItem>
              <MenuItem value="Makanan Indonesia">Makanan Indonesia</MenuItem>
              <MenuItem value="Makanan Barat">Makanan Barat</MenuItem>
              <MenuItem value="Makanan Asia">Makanan Asia</MenuItem>
            </Select>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              sx={styles.selectFilter}
            >
              <MenuItem value="default">Urutkan</MenuItem>
              <MenuItem value="price-asc">Harga: Terendah - Tertinggi</MenuItem>
              <MenuItem value="price-desc">Harga: Tertinggi - Terendah</MenuItem>
              <MenuItem value="name-asc">Nama: A - Z</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Grid Daftar Makanan */}
        <Grid container spacing={3.5} sx={styles.gridContainer}>
          {processedFoods.map((item) => (
            <Grid item key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={styles.foodCard}>
                {/* Gambar Makanan */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={styles.cardImage}
                />

                {/* Detail Kartu Makanan */}
                <Box sx={styles.cardDetails}>
                  <Chip
                    label={item.category}
                    sx={{
                      ...styles.categoryChip,
                      ...(item.category === "Makanan Indonesia" && styles.chipIndonesian),
                      ...(item.category === "Makanan Barat" && styles.chipWestern),
                      ...(item.category === "Makanan Asia" && styles.chipAsian),
                    }}
                  />

                  <Typography variant="h6" sx={styles.foodName}>
                    {item.name}
                  </Typography>

                  <Typography variant="h5" sx={styles.foodPrice}>
                    Rp. {item.price.toLocaleString("id-ID")}
                  </Typography>

                  <Box sx={styles.cardFooter}>
                    <IconButton
                      onClick={() => handleToggleFavorite(item.id)}
                      sx={styles.favButton}
                    >
                      {item.isFavorite ? (
                        <StarIcon sx={{ color: "#370344ff" }} />
                      ) : (
                        <StarBorderIcon sx={{ color: "#d1d5db" }} />
                      )}
                    </IconButton>

                    <Typography variant="caption" sx={styles.statusText}>
                      Tersedia
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(item.name)}
                    sx={styles.addToCartBtn}
                  >
                    Tambah ke Keranjang
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}

          {processedFoods.length === 0 && (
            <Grid item size={{ xs: 12 }}>
              <Box sx={styles.noResultsBox}>
                <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
                  Makanan tidak ditemukan. Silakan cari menu lain!
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Notifikasi Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%", borderRadius: "12px", fontWeight: "bold", backgroundColor: "#c2185b", color: "#fff" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
    padding: { xs: 2, sm: 4, md: 6 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  innerWrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  headerCard: {
    backgroundColor: "#ffffff",
    borderRadius: "28px",
    padding: { xs: 3, sm: 4, md: 5 },
    boxShadow: "0px 12px 40px rgba(173, 20, 87, 0.25)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2.5,
  },
  headerTitle: {
    fontWeight: 800,
    color: "#c2185b",
    fontSize: { xs: "32px", sm: "40px" },
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#757575",
    fontSize: "15px",
    fontWeight: 500,
    textAlign: "center",
    marginTop: "-12px",
    marginBottom: "8px",
  },
  searchField: {
    maxWidth: "800px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      backgroundColor: "#ffffff",
      paddingLeft: "15px",
      "& fieldset": { borderColor: "#f48fb1" },
      "&:hover fieldset": { borderColor: "#c2185b" },
      "&.Mui-focused fieldset": { borderColor: "#c2185b", borderWidth: "1.5px" },
    },
    "& .MuiInputBase-input": { padding: "14px 10px", fontSize: "15px" },
  },
  filtersRow: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  selectFilter: {
    minWidth: "150px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    color: "#4b5563",
    fontWeight: 600,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f48fb1",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c2185b",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c2185b",
      borderWidth: "1.5px",
    },
    "& .MuiSelect-select": {
      padding: "10px 18px",
    },
  },
  gridContainer: {
    width: "100%",
    margin: 0,
  },
  foodCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0px 12px 35px rgba(173, 20, 87, 0.15)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0px 20px 45px rgba(173, 20, 87, 0.25)",
    },
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardDetails: {
    padding: "20px 22px",
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },
  categoryChip: {
    alignSelf: "flex-start",
    fontSize: "11px",
    fontWeight: 700,
    height: "24px",
    borderRadius: "8px",
  },
  chipIndonesian: {
    backgroundColor: "#fce4ec",
    color: "#c2185b",
  },
  chipWestern: {
    backgroundColor: "#fbcfe8",
    color: "#9d174d",
  },
  chipAsian: {
    backgroundColor: "#f472b6",
    color: "#ffffff",
  },
  foodName: {
    fontWeight: 700,
    color: "#1f2937",
    fontSize: "18px",
    lineHeight: 1.3,
  },
  foodPrice: {
    fontWeight: 800,
    color: "#c2185b",
    fontSize: "20px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0.5,
  },
  favButton: {
    padding: "4px",
    marginLeft: "-4px",
  },
  statusText: {
    color: "#9ca3af",
    fontWeight: 600,
    fontSize: "12px",
  },
  addToCartBtn: {
    marginTop: 1,
    padding: "10px",
    borderRadius: "12px",
    backgroundColor: "#c2185b",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "none",
    boxShadow: "0px 6px 15px rgba(194, 24, 91, 0.3)",
    "&:hover": {
      backgroundColor: "#ad1457",
      boxShadow: "0px 8px 20px rgba(173, 20, 87, 0.4)",
    },
  },
  noResultsBox: {
    width: "100%",
    padding: 6,
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    border: "2px dashed rgba(255, 255, 255, 0.4)",
  },
};
