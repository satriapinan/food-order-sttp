import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import FoodCard from "../components/FoodCard";
import AppSnackbar from "../components/AppSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import api from "../services/api";

// Import Assets Gambar Tradisional Lo
import cenilImg from "../assets/cenil.jpg";
import dadarGulungImg from "../assets/dadar gulung.png";
import kueLapisImg from "../assets/kue lapis.png";
import sateLilitImg from "../assets/sate lilit.jpg";
import serabiImg from "../assets/serabi.jpg";
import heroImg from "../assets/hero.png";

// List makanan tradisional yang mau lo jadiin pengganti data API
const TRADITIONAL_FOODS = [
  {
    name: "Cenil",
    description: "Kue tradisional kenyal warna-warni dengan taburan kelapa parut.",
    image: cenilImg,
    category: "Jajanan Pasar",
  },
  {
    name: "Dadar Gulung",
    description: "Kue gulung hijau aroma pandan dengan isian kelapa manis.",
    image: dadarGulungImg,
    category: "Jajanan Pasar",
  },
  {
    name: "Kue Lapis",
    description: "Kue basah berlapis-lapis dengan tekstur lembut dan manis pas.",
    image: kueLapisImg,
    category: "Kue Basah",
  },
  {
    name: "Sate Lilit",
    description: "Sate khas Bali dari daging cincang rempah yang dililit di batang sereh.",
    image: sateLilitImg,
    category: "Makanan Utama",
  },
  {
    name: "Serabi",
    description: "Kue serabi tradisional yang gurih disiram kuah kencana manis.",
    image: serabiImg,
    category: "Jajanan Pasar",
  },
];

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Load Data dari API & Merge dengan Gambar/Nama Tradisional
  useEffect(() => {
    setLoading(true);
    setError("");

    api.get("/food-order/foods")
      .then((res) => {
        const rawData = res.data?.data || res.data || [];

        // Gabungin ID/Harga dari API dengan Nama & Gambar Tradisional lo
        const mappedFoods = rawData.map((item, index) => {
          const trad = TRADITIONAL_FOODS[index % TRADITIONAL_FOODS.length];
          return {
            ...item, // Tetap bawa ID & Price asli backend buat transaksi
            name: trad.name,
            description: trad.description,
            image: trad.image,
            category: trad.category,
          };
        });

        setFoods(mappedFoods);
        setCategories(["Jajanan Pasar", "Kue Basah", "Makanan Utama"]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load data:", err);
        setError("Gagal memuat menu makanan.");
        setLoading(false);
      });
  }, []);

  // Filter & Sort FULL berdasarkan Makanan Tradisional
  const filteredAndSortedFoods = useMemo(() => {
    let result = [...foods];

    // 1. SEARCH (Sekarang Murni nyari "Cenil", "Dadar Gulung", dll)
    if (search.trim() !== "") {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // 2. KATEGORI
    if (selectedCategory !== "") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // 3. SORTING
    if (sort === "price_asc") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sort === "price_desc") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sort === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [foods, search, selectedCategory, sort]);

  // Handle Add to Cart tetap bawa ID API backend
  const handleAddToCart = async (foodItem) => {
    const actualFoodId = foodItem.id || foodItem._id || foodItem.foodId;

    if (!actualFoodId) {
      showSnackbar("ID Makanan tidak valid", "error");
      return;
    }

    try {
      await api.post("/food-order/cart", {
        foodId: actualFoodId,
        quantity: 1,
      });
      showSnackbar(`${foodItem.name} berhasil masuk keranjang!`, "success");
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || "Gagal masuk keranjang",
        "error"
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Dynamic Controls */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <TextField
          label="🔍 Cari Makanan Tradisional"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: "240px", flex: 1 }}
        />

        <FormControl sx={{ minWidth: "180px" }}>
          <InputLabel>📂 Kategori</InputLabel>
          <Select
            value={selectedCategory}
            label="📂 Kategori"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Semua Kategori</MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "180px" }}>
          <InputLabel>🔃 Urutkan</InputLabel>
          <Select
            value={sort}
            label="🔃 Urutkan"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price_asc">Harga: Terendah</MenuItem>
            <MenuItem value="price_desc">Harga: Tertinggi</MenuItem>
            <MenuItem value="name_asc">Nama: A - Z</MenuItem>
            <MenuItem value="name_desc">Nama: Z - A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          {filteredAndSortedFoods.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              Makanan yang kamu cari tidak ditemukan.
            </Alert>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredAndSortedFoods.map((food, index) => (
                <FoodCard
                  key={food.id || food._id || index}
                  food={food}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </Box>
          )}
        </>
      )}

      <AppSnackbar
        open={snackbar?.open || false}
        message={snackbar?.message || ""}
        severity={snackbar?.severity || "info"}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default FoodMenu;