import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useTheme } from "../hooks/useTheme";

// ====== DATABASE GAMBAR MAKANAN ======
// Sumber: Unsplash (gratis, tidak perlu API key)
// Cara pakai: cari kata kunci di nama makanan → ambil URL
const FOOD_IMAGES = {
  // Nasi & Rice
  nasi: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
  "nasi goreng":
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
  "nasi uduk":
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
  "nasi padang":
    "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop",
  rice: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop",

  // Mie & Noodle
  mie: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  "mie ayam":
    "https://images.unsplash.com/photo-1618889482923-38250401a84e?w=400&h=300&fit=crop",
  "mie goreng":
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
  bakso:
    "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop",
  ramen:
    "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=300&fit=crop",
  noodle:
    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop",

  // Ayam & Chicken
  ayam: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
  "ayam bakar":
    "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop",
  "ayam goreng":
    "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
  "ayam geprek":
    "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=400&h=300&fit=crop",
  chicken:
    "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=400&h=300&fit=crop",

  // Sate
  sate: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop",
  satay:
    "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&h=300&fit=crop",

  // Gado-gado & Sayur
  "gado-gado":
    "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  gado: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  salad:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",

  // Bakso & Sop
  sop: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",

  // Dessert & Es
  "es krim":
    "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop",
  ice: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop",
  dessert:
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  pudding:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",

  // Western
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  pizza:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  pasta:
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
  steak:
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&h=300&fit=crop",

  // Seafood
  ikan: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
  fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
  udang:
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",
  shrimp:
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",

  // Minuman
  "es teh":
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  jus: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  juice:
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
  kopi: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",

  // Roti
  roti: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
};

// ====== FUNGSI CARI GAMBAR ======
const findFoodImage = (item) => {
  // 1. Kalau backend kirim field gambar, pakai itu
  const backendImage =
    item.image ||
    item.imageUrl ||
    item.imagePath ||
    item.foto ||
    item.photo ||
    item.thumbnail;

  if (backendImage) return backendImage;

  // 2. Cari berdasarkan nama makanan
  const name = (item.name || item.foodName || "").toLowerCase();

  // Cari match paling spesifik dulu (kata kunci terpanjang)
  const keywords = Object.keys(FOOD_IMAGES).sort((a, b) => b.length - a.length);

  for (const keyword of keywords) {
    if (name.includes(keyword)) {
      return FOOD_IMAGES[keyword];
    }
  }

  // 3. Cari berdasarkan kategori
  const category = (
    item.categories?.categoryName ||
    item.categoryName ||
    ""
  ).toLowerCase();

  if (category.includes("dessert")) return FOOD_IMAGES.dessert;
  if (category.includes("western")) return FOOD_IMAGES.burger;
  if (category.includes("asian")) return FOOD_IMAGES.noodle;
  if (category.includes("indonesian")) return FOOD_IMAGES["nasi goreng"];

  // 4. Kalau tidak ada match, return null (akan pakai placeholder)
  return null;
};

const FoodCard = ({ item, onAddToCart }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const imageUrl = findFoodImage(item);

  return (
    <Card
      sx={{
        borderRadius: "24px",
        p: 1.5,
        border: "1px solid",
        borderColor: isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.4)",
        boxShadow: isDark
          ? "0 10px 30px rgba(0, 0, 0, 0.5)"
          : "0 10px 30px rgba(255, 126, 95, 0.15)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDark
          ? "rgba(30, 30, 36, 0.85)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: isDark
            ? "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 126, 95, 0.2)"
            : "0 20px 40px rgba(255, 126, 95, 0.3)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {imageUrl ? (
          <CardMedia
            component="img"
            height="180"
            image={imageUrl}
            alt={item.name}
            onError={(e) => {
              // Kalau gambar gagal load, ganti ke placeholder
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
            sx={{
              borderRadius: "18px",
              objectFit: "cover",
              mb: 1.5,
              backgroundColor: isDark ? "#2c2c35" : "#f0f0f0",
            }}
          />
        ) : null}

        {/* Placeholder — muncul kalau tidak ada gambar atau gambar gagal load */}
        <Box
          sx={{
            height: 180,
            borderRadius: "18px",
            mb: 1.5,
            backgroundColor: isDark ? "#2c2c35" : "#f0f0f0",
            display: imageUrl ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <RestaurantIcon
            sx={{ fontSize: 60, color: isDark ? "#4a4a55" : "#ccc" }}
          />
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#4a4a55" : "#aaa",
              fontWeight: "600",
            }}
          >
            Tidak ada gambar
          </Typography>
        </Box>

        <Chip
          label={
            item.categories?.categoryName || item.categoryName || "Kategori"
          }
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: isDark
              ? "rgba(20, 20, 25, 0.85)"
              : "rgba(255, 255, 255, 0.9)",
            color: "#ff7e5f",
            fontSize: "10px",
            fontWeight: "900",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      <CardContent sx={{ p: 0, px: 1, flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="900"
          sx={{
            mb: 0.5,
            color: isDark ? "#f5f6fa" : "#2d3436",
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Typography variant="h6" fontWeight="900" sx={{ color: "#ff7e5f" }}>
            Rp {item.price?.toLocaleString("id-ID") || 0}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              backgroundColor: isDark ? "rgba(254, 202, 87, 0.15)" : "#fff5e6",
              px: 1,
              py: 0.3,
              borderRadius: "8px",
            }}
          >
            <StarIcon sx={{ color: "#feca57", fontSize: 16 }} />
            <Typography variant="caption" fontWeight="900" color="#feca57">
              {item.rating || "Baru"}
            </Typography>
          </Box>
        </Box>

        {item.description && (
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#a4b0be" : "#636e72",
              fontWeight: "500",
              display: "-webkit-box",
              mb: 2,
              minHeight: 32,
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.description}
          </Typography>
        )}
      </CardContent>

      <Button
        variant="contained"
        fullWidth
        startIcon={<ShoppingCartIcon />}
        onClick={() => onAddToCart(item)}
        disabled={item.isCart}
        sx={{
          background: item.isCart
            ? "rgba(150, 150, 150, 0.5)"
            : "linear-gradient(45deg, #ff7e5f, #feb47b)",
          color: "#fff",
          textTransform: "none",
          borderRadius: "14px",
          fontWeight: "bold",
          fontSize: "15px",
          py: 1.2,
          boxShadow: item.isCart
            ? "none"
            : "0 4px 15px rgba(255, 126, 95, 0.4)",
          transition: "all 0.2s",
          "&:hover": {
            background: item.isCart
              ? "rgba(150, 150, 150, 0.5)"
              : "linear-gradient(45deg, #e65c00, #ff7e5f)",
            boxShadow: item.isCart
              ? "none"
              : "0 8px 20px rgba(255, 126, 95, 0.6)",
          },
        }}
      >
        {item.isCart ? "Sudah di Keranjang" : "Tambah"}
      </Button>
    </Card>
  );
};

export default FoodCard;
