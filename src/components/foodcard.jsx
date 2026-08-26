import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

function FoodCard({ food, onAddToCart }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <Card
      sx={{
        borderRadius: "28px",
        backgroundColor: "#D9E9CF",
        boxShadow: "0 8px 20px rgba(140, 179, 105, 0.15)",
        p: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-5px)" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={food.image}
        alt={food.name}
        sx={{
          borderRadius: "20px",
          objectFit: "cover",
          backgroundColor: "#fff",
        }}
      />

      <CardContent
        sx={{
          px: 1,
          py: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#2B3A29",
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            {food.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#5A7052", fontSize: "0.85rem", mb: 2 }}
          >
            {food.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#1F2E1C" }}
          >
            {formatRupiah(food.price)}
          </Typography>
          <IconButton
            onClick={() => onAddToCart(food)}
            sx={{
              backgroundColor: "#2B3A29",
              color: "#fff",
              "&:hover": { backgroundColor: "#8CB369" },
              borderRadius: "12px",
              p: 1,
            }}
          >
            <AddIcon sx={{ fontWeight: "bold" }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FoodCard;