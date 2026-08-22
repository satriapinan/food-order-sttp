import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// 1. Import semua gambar dari assets
import cenilImg from "../assets/cenil.jpg";
import dadarImg from "../assets/dadar gulung.png";
import sateImg from "../assets/sate lilit.jpg";
import serabiImg from "../assets/serabi.jpg";

// 2. Fungsi pembantu untuk mencocokkan gambar secara fleksibel
const getFoodImage = (food) => {
  // Jika dari API sudah ada URL gambar langsung
  if (food?.imageUrl || food?.image) {
    return food.imageUrl || food.image;
  }

  const name = (food?.foodName || food?.name || "").toLowerCase();

  if (name.includes("dadar") || name.includes("gulung")) return dadarImg;
  if (name.includes("sate") || name.includes("lilit")) return sateImg;
  if (name.includes("serabi")) return serabiImg;
  if (name.includes("cenil")) return cenilImg;

  // Gambar bawaan jika nama tidak cocok dengan kata kunci manapun
  return cenilImg;
};

export default function FoodCard({ food, onAddToCart }) {
  const imageSrc = getFoodImage(food);

  return (
    <Card sx={{ width: 250, borderRadius: "16px", p: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageSrc}
        alt={food?.foodName || "Food"}
        sx={{ borderRadius: "12px", objectFit: "cover" }}
      />
      <CardContent sx={{ pb: 1, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 0.5 }}>
          {food?.foodName || food?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
          Rp {food?.price?.toLocaleString("id-ID")}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1, pt: 0 }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={() => onAddToCart(food)}
          sx={{ backgroundColor: "#2B7A78", borderRadius: "8px", fontWeight: "bold" }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Card>
  );
}