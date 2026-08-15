import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from "@mui/material";

export default function FoodCard({
  image,
  category,
  name,
  price,
  rating = 5,
  available,
  onAddToCart,
}) {
  // State jika pengguna ingin memberikan/mengubah nilai rating sendiri di card
  const [userRating, setUserRating] = useState(rating);

  return (
    <Card
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          textAlign: "center",
          p: 2,
        }}
      >
        <Chip
          label={category}
          size="small"
          sx={{
            backgroundColor: "#EAE6FF",
            color: "#6D5BD0",
            fontWeight: 600,
            mb: 1,
            borderRadius: "12px",
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem", mb: 0.5 }}>
          {name}
        </Typography>

        {/* Tampilan Rating Bintang */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Rating
            name={`rating-${name}`}
            value={userRating}
            precision={0.5}
            size="small"
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setUserRating(newValue);
              }
            }}
          />
          <Typography variant="caption" sx={{ color: "#777", fontWeight: 600 }}>
            ({userRating})
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ color: "#6D5BD0", fontWeight: 700, mb: 1 }}
        >
          Rp {price ? price.toLocaleString("id-ID") : "0"}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: available ? "#8B87A3" : "#e53935",
            mb: 2,
            fontWeight: 500,
          }}
        >
          {available ? "Available" : "Habis"}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          disabled={!available}
          onClick={onAddToCart}
          sx={{
            backgroundColor: "#1E88E5",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            mt: "auto",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          ADD TO CART
        </Button>
      </CardContent>
    </Card>
  );
}