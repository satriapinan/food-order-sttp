import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import AppButton from "./AppButton";

const FoodCard = ({ food, isDark, onAddToCart }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: isDark
          ? "0 2px 12px rgba(0,0,0,0.4)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={food.image}
        alt={food.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ padding: "12px 16px" }}>
        <Chip
          label={food.category}
          size="small"
          sx={{
            fontSize: "0.7rem",
            height: "22px",
            marginBottom: "8px",
            backgroundColor: isDark ? "#1976d233" : "#1976d214",
            color: "#1976d2",
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{ color: isDark ? "#fff" : "#1e1e1e", fontWeight: 600, lineHeight: 1.3 }}
        >
          {food.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "6px 0 12px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#1976d2" }}
          >
            Rp. {food.price.toLocaleString("id-ID")}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: food.available ? "#4caf50" : "#e53935" }}
          >
            {food.available ? "Available" : "Unavailable"}
          </Typography>
        </Box>

        <AppButton
          onClick={() => onAddToCart(food)}
          sx={{
            fontSize: "0.8rem",
            padding: "6px 0",
            borderRadius: "8px",
          }}
        >
          Add to Cart
        </AppButton>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
