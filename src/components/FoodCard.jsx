import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import nasiGorengImg from "../assets/Nasi_Goreng.jpg";

const FoodCard = ({ food, isDark, onAddToCart, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(food?.isFavorite || false);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
    if (onToggleFavorite) {
      onToggleFavorite(food.id);
    }
  };

  const foodImage = food?.image || food?.imageUrl || nasiGorengImg;
  const foodName = food?.name || food?.foodName || "Makanan";
  const foodCategory = food?.category || food?.categoryName || "Makanan";
  const foodPrice = food?.price || 0;

  return (
    <Box
      sx={{
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#ffffff" : "inherit",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        boxShadow: isDark
          ? "0px 12px 35px rgba(0, 0, 0, 0.6)"
          : "0px 12px 35px rgba(173, 20, 87, 0.15)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDark
            ? "0px 20px 45px rgba(0, 0, 0, 0.8)"
            : "0px 20px 45px rgba(173, 20, 87, 0.25)",
        },
      }}
    >
      <Box
        component="img"
        src={foodImage}
        alt={foodName}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Chip
            label={foodCategory}
            sx={{
              alignSelf: "flex-start",
              fontSize: "11px",
              fontWeight: 700,
              height: "24px",
              borderRadius: "8px",
              backgroundColor: isDark ? "#2a081a" : "#fce4ec",
              color: isDark ? "#f48fb1" : "#c2185b",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: 1.3,
              color: isDark ? "#ffffff" : "#1f2937",
            }}
          >
            {foodName}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: "20px",
              color: isDark ? "#f48fb1" : "#c2185b",
            }}
          >
            Rp. {Number(foodPrice).toLocaleString("id-ID")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleFavoriteClick}
              sx={{ padding: "4px", marginLeft: "-4px" }}
            >
              {isFavorite ? (
                <StarIcon sx={{ color: "#e91e63" }} />
              ) : (
                <StarBorderIcon sx={{ color: isDark ? "#666" : "#d1d5db" }} />
              )}
            </IconButton>

            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                color: isDark ? "#aaa" : "#9ca3af",
              }}
            >
              Tersedia
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={() => onAddToCart && onAddToCart(food)}
          sx={{
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
          }}
        >
          Tambah ke Keranjang
        </Button>
      </Box>
    </Box>
  );
};

export default FoodCard;
