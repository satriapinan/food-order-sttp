import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BlockIcon from "@mui/icons-material/Block";
import { useTheme } from "../hooks/useTheme";

function FoodCard({
  image,
  category,
  name,
  price,
  rating = 5.0,
  isAvailable = true, 
  onAddToCart,
}) {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price || 0);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "18px",
        overflow: "hidden",
        backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        border: isDark ? "1px solid #2D2D2D" : "1px solid #F0F0F5",
        opacity: isAvailable ? 1 : 0.8, // Sedikit redup jika habis
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.3)"
          : "0 6px 20px rgba(109, 91, 208, 0.06)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: isAvailable ? "translateY(-6px)" : "none",
          boxShadow: isDark
            ? "0 12px 28px rgba(0,0,0,0.5)"
            : "0 14px 28px rgba(109, 91, 208, 0.14)",
          "& .card-media-img": {
            transform: isAvailable ? "scale(1.06)" : "none",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", pt: "65%" }}>
        <CardMedia
          component="img"
          className="card-media-img"
          image={image}
          alt={name}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80";
          }}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isAvailable ? "none" : "grayscale(60%)", // Efek keabu-abuan jika habis
            transition: "transform 0.4s ease",
          }}
        />

        {/* Badge Kategori */}
        {category && (
          <Chip
            label={category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: isDark ? "rgba(30, 30, 30, 0.75)" : "rgba(255, 255, 255, 0.85)",
              color: isDark ? "#E0E0E0" : "#2E2A47",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.3px",
              backdropFilter: "blur(8px)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          />
        )}

        {/* Badge Status Ketersediaan */}
        <Chip
          label={isAvailable ? "Tersedia" : "Habis"}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: isAvailable
              ? "rgba(46, 125, 50, 0.85)"
              : "rgba(211, 47, 47, 0.85)",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.68rem",
            backdropFilter: "blur(6px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />

        {/* Badge Rating */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            px: 1.2,
            py: 0.4,
            borderRadius: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
            color: "#FFF",
          }}
        >
          <StarIcon sx={{ color: "#FFC107", fontSize: "0.9rem" }} />
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: "0.75rem" }}>
            {Number(rating).toFixed(1)}
          </Typography>
        </Box>
      </Box>

      {/* Detail Konten */}
      <CardContent sx={{ flexGrow: 1, p: 2.5, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: isDark ? "#F3F4F6" : "#2E2A47",
            lineHeight: 1.3,
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.6em",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: isAvailable ? "#6D5BD0" : "text.disabled",
            fontSize: "1.1rem",
            mt: "auto",
          }}
        >
          {formattedPrice}
        </Typography>
      </CardContent>

      {/* Tombol Aksi */}
      <CardActions sx={{ p: 2.5, pt: 0 }}>
        <Button
          fullWidth
          disabled={!isAvailable}
          variant="contained"
          startIcon={
            isAvailable ? (
              <ShoppingBagIcon sx={{ fontSize: "1.1rem !important" }} />
            ) : (
              <BlockIcon sx={{ fontSize: "1.1rem !important" }} />
            )
          }
          onClick={onAddToCart}
          sx={{
            backgroundColor: "#6D5BD0",
            color: "#FFFFFF",
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "0.9rem",
            py: 1.1,
            boxShadow: "0 4px 12px rgba(109, 91, 208, 0.25)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#5B49C0",
              boxShadow: "0 6px 16px rgba(109, 91, 208, 0.35)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
            "&.Mui-disabled": {
              backgroundColor: isDark ? "#333333" : "#E0E0E0",
              color: isDark ? "#666666" : "#9E9E9E",
            },
          }}
        >
          {isAvailable ? "Tambah" : "Habis"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default FoodCard;