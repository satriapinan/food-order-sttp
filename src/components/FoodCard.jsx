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

const FoodCard = ({ item, onAddToCart }) => (
  <Card
    sx={{
      borderRadius: "24px",
      p: 1.5,
      border: "1px solid rgba(255,255,255,0.4)",
      boxShadow: "0 10px 30px rgba(255, 126, 95, 0.15)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 20px 40px rgba(255, 126, 95, 0.3)",
      },
    }}
  >
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="180"
        image={item.image}
        alt={item.name}
        sx={{
          borderRadius: "18px",
          objectFit: "cover",
          mb: 1.5,
          backgroundColor: "#f0f0f0",
        }}
      />
      <Chip
        label={item.categoryName}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
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
        sx={{ mb: 0.5, color: "#2d3436", lineHeight: 1.2 }}
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
          {item.price}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            backgroundColor: "#fff5e6",
            px: 1,
            py: 0.3,
            borderRadius: "8px",
          }}
        >
          <StarIcon sx={{ color: "#feca57", fontSize: 16 }} />
          <Typography variant="caption" fontWeight="900" color="#e1b12c">
            {item.rating}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "#b2bec3", fontWeight: "600", display: "block", mb: 2 }}
      >
        Status:{" "}
        <span
          style={{
            color: item.status === "Bestseller" ? "#ff7e5f" : "#00cec9",
          }}
        >
          {item.status}
        </span>
      </Typography>
    </CardContent>
    <Button
      variant="contained"
      fullWidth
      startIcon={<ShoppingCartIcon />}
      onClick={() => onAddToCart(item)}
      sx={{
        background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
        color: "#fff",
        textTransform: "none",
        borderRadius: "14px",
        fontWeight: "bold",
        fontSize: "15px",
        py: 1.2,
        boxShadow: "0 4px 15px rgba(255, 126, 95, 0.4)",
        transition: "all 0.2s",
        "&:hover": {
          background: "linear-gradient(45deg, #e65c00, #ff7e5f)",
          boxShadow: "0 8px 20px rgba(255, 126, 95, 0.6)",
        },
      }}
    >
      Tambah
    </Button>
  </Card>
);

export default FoodCard;
