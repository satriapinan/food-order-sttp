import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AppButton from "./AppButton";

function FoodCard({ menu, onAddToCart }) {
  const GAMBAR_PENGGANTI = "/images/nasigoreng.jpg";
  const namaMakanan = menu.name || "Menu Tanpa Nama";
  const hargaMakanan = menu.price
    ? `Rp. ${Number(menu.price).toLocaleString("id-ID")}`
    : "Rp. 0";
  const kategoriMakanan = menu.categories?.categoryName || "Umum";

  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={menu.image || GAMBAR_PENGGANTI}
        alt={namaMakanan}
        sx={{ objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = GAMBAR_PENGGANTI;
        }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ mb: 1 }}>
          <Chip
            label={kategoriMakanan}
            size="small"
            sx={{
              backgroundColor: "#ffebee",
              color: "#b22222",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {namaMakanan}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#b22222", mb: 2 }}
        >
          {hargaMakanan}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
            mb: 1,
          }}
        >
          <IconButton size="small">
            <StarBorderIcon
              sx={{ color: menu.isFavorite ? "#b22222" : "#b0bec5" }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: "bold" }}
          >
            Tersedia
          </Typography>
        </Box>

        <AppButton fullWidth onClick={onAddToCart}>
          Tambahkan ke Keranjang
        </AppButton>
      </CardContent>
    </Card>
  );
}

export default FoodCard;
