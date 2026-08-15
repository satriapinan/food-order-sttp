import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import AppButton from "./AppButton";

const FoodCard = ({ image, category, name, price, available, onAddToCart }) => {
  return (
    <Card sx={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
      <Box
        sx={{
          height: 140,
          backgroundColor: "#EAEAEA",
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!image && (
          <Typography variant="caption" sx={{ color: "#9AA0A6" }}>
            [ Gambar Makanan ]
          </Typography>
        )}
      </Box>

      <CardContent>
        <Chip
          label={category || "[ Kategori ]"}
          size="small"
          sx={{ backgroundColor: "#EFEBFA", color: "#6D5BD0", fontWeight: 600, marginBottom: 1 }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#2E2A47" }}>
          {name || "[ Nama Makanan ]"}
        </Typography>

        <Typography variant="body1" sx={{ color: "#6D5BD0", fontWeight: 700, marginBottom: 1 }}>
          {price ? `Rp. ${price.toLocaleString("id-ID")}` : "[ Harga ]"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1.5 }}>
          <Typography variant="caption" sx={{ color: "#8B87A3" }}>
            {available ? "Available" : "Habis"}
          </Typography>
        </Box>

        <AppButton onClick={onAddToCart}>Add to Cart</AppButton>
      </CardContent>
    </Card>
  );
};

export default FoodCard;