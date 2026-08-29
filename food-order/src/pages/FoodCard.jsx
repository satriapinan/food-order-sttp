import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import AppButton from "../components/AppButton";

const FOOD_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400";

const FoodCard = ({ food, isDark, onAddToCart }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)",
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={food.image || FOOD_IMAGE}
        alt={food.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ padding: "12px 16px" }}>
        <Chip
          label={food.categories?.categoryName || food.category}
          size="small"
          sx={{
            fontSize: "0.7rem",
            height: "22px",
            backgroundColor: isDark ? "#2a2a2a" : "#E4F0F6",
            color: "#548394",
            fontWeight: "bold",
            mb: 1,
          }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: isDark ? "#fff" : "#000" }}>
          {food.name}
        </Typography>
        {food.description && (
          <Typography variant="body2" sx={{ color: "#888", fontSize: "12px", mb: 0.5 }}>
            {food.description}
          </Typography>
        )}
        <Typography variant="body1" sx={{ color: "#548394", fontWeight: "bold", mb: 2 }}>
          {food.price}
        </Typography>

        <AppButton onClick={() => onAddToCart && onAddToCart(food)}>Add to Cart</AppButton>
      </CardContent>
    </Card>
  );
};

export default FoodCard;