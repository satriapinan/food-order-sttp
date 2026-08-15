import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import AppButton from "../components/AppButton";
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

// Skema Validasi Yup untuk Filter & Pencarian Makanan
const foodMenuSchema = Yup.object({
  searchQuery: Yup.string().max(50, "Pencarian maksimal 50 karakter"),
  categoryFilter: Yup.string(),
  sortBy: Yup.string(),
});

export default function FoodMenuPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});

  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [foods, setFoods] = useState(INITIAL_FOODS);

  // Status/state untuk notifikasi Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Menggunakan Formik untuk mengelola state filter dan pencarian
  const formik = useFormik({
    initialValues: {
      searchQuery: "",
      categoryFilter: "All",
      sortBy: "default",
    },
    validationSchema: foodMenuSchema,
  });

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

  // Memproses daftar makanan berdasarkan nilai Formik
  const processedFoods = useMemo(() => {
    let result = [...foods];
    const { searchQuery, categoryFilter, sortBy } = formik.values;

    // Filter berdasarkan kata kunci pencarian
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
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
  }, [foods, formik.values]);

  return (
    <Box
      sx={{
        ...styles.container,
        background: isDark
          ? "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #2a081a 100%)"
          : "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
      }}
    >
      <Box sx={styles.innerWrapper}>
        {/* Kontainer Kartu Header Atas */}
        <Box
          sx={{
            ...styles.headerCard,
            backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
            color: isDark ? "#ffffff" : "inherit",
            boxShadow: isDark
              ? "0px 12px 40px rgba(0, 0, 0, 0.6)"
              : "0px 12px 40px rgba(173, 20, 87, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            {/* Element kosong di kiri untuk menyeimbangkan posisi judul di tengah */}
            <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />

            <Typography
              component="h1"
              variant="h3"
              sx={{
                ...styles.headerTitle,
                color: isDark ? "#f48fb1" : "#c2185b",
                flex: { xs: "1", sm: "2" },
                textAlign: "center",
              }}
            >
              Food Order
            </Typography>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <AppButton
                onClick={handleLogout}
                sx={{
                  width: "auto",
                  px: 3,
                  py: 1,
                  fontSize: "14px",
                }}
              >
                Logout
              </AppButton>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{ marginTop: "8px", color: isDark ? "#bbb" : "#888" }}
          >
            Selamat datang, {user ? user.email : "Guest"}!
          </Typography>

          {/* Form Pencarian & Filter menggunakan Formik */}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <TextField
              placeholder="Cari makanan..."
              variant="outlined"
              fullWidth
              name="searchQuery"
              value={formik.values.searchQuery}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.searchQuery && Boolean(formik.errors.searchQuery)}
              helperText={formik.touched.searchQuery && formik.errors.searchQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: isDark ? "#f48fb1" : "#c2185b" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                ...styles.searchField,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
                  color: isDark ? "#ffffff" : "inherit",
                  paddingLeft: "15px",
                  "& fieldset": { borderColor: isDark ? "#444" : "#f48fb1" },
                  "&:hover fieldset": { borderColor: "#c2185b" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c2185b",
                    borderWidth: "1.5px",
                  },
                },
              }}
            />

            <Box sx={styles.filtersRow}>
              <Select
                name="categoryFilter"
                value={formik.values.categoryFilter}
                onChange={formik.handleChange}
                displayEmpty
                sx={{
                  ...styles.selectFilter,
                  backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
                  color: isDark ? "#ffffff" : "#4b5563",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDark ? "#444" : "#f48fb1",
                  },
                }}
              >
                <MenuItem value="All">Kategori (Semua)</MenuItem>
                <MenuItem value="Makanan Indonesia">Makanan Indonesia</MenuItem>
                <MenuItem value="Makanan Barat">Makanan Barat</MenuItem>
                <MenuItem value="Makanan Asia">Makanan Asia</MenuItem>
              </Select>

              <Select
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                displayEmpty
                sx={{
                  ...styles.selectFilter,
                  backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
                  color: isDark ? "#ffffff" : "#4b5563",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDark ? "#444" : "#f48fb1",
                  },
                }}
              >
                <MenuItem value="default">Urutkan </MenuItem>
                <MenuItem value="price-asc">Harga: Terendah - Tertinggi</MenuItem>
                <MenuItem value="price-desc">Harga: Tertinggi - Terendah</MenuItem>
                <MenuItem value="name-asc">Nama: A - Z</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>

        {/* Grid Daftar Makanan */}
        <Grid container spacing={3.5} sx={styles.gridContainer}>
          {processedFoods.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  ...styles.foodCard,
                  backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                  color: isDark ? "#ffffff" : "inherit",
                }}
              >
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

                  <Typography
                    variant="h6"
                    sx={{
                      ...styles.foodName,
                      color: isDark ? "#ffffff" : "#1f2937",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      ...styles.foodPrice,
                      color: isDark ? "#f48fb1" : "#c2185b",
                    }}
                  >
                    Rp. {item.price.toLocaleString("id-ID")}
                  </Typography>

                  <Box sx={styles.cardFooter}>
                    <IconButton
                      onClick={() => handleToggleFavorite(item.id)}
                      sx={styles.favButton}
                    >
                      {item.isFavorite ? (
                        <StarIcon sx={{ color: "#e91e63" }} />
                      ) : (
                        <StarBorderIcon sx={{ color: isDark ? "#666" : "#d1d5db" }} />
                      )}
                    </IconButton>

                    <Typography
                      variant="caption"
                      sx={{
                        ...styles.statusText,
                        color: isDark ? "#aaa" : "#9ca3af",
                      }}
                    >
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
            <Grid size={{ xs: 12 }}>
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
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontWeight: "bold",
            backgroundColor: "#c2185b",
            color: "#fff",
          }}
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
    padding: { xs: 2, sm: 4, md: 6 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background 0.3s ease",
  },
  innerWrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  headerCard: {
    borderRadius: "28px",
    padding: { xs: 3, sm: 4, md: 5 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2.5,
    transition: "all 0.3s ease",
  },
  headerTitle: {
    fontWeight: 800,
    fontSize: { xs: "32px", sm: "40px" },
    textAlign: "center",
  },
  searchField: {
    maxWidth: "800px",
    width: "100%",
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
    minWidth: "160px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    "& .MuiSelect-select": {
      padding: "10px 18px",
    },
  },
  gridContainer: {
    width: "100%",
    margin: 0,
  },
  foodCard: {
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
    fontSize: "18px",
    lineHeight: 1.3,
  },
  foodPrice: {
    fontWeight: 800,
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
