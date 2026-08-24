import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

function FoodCard({
  food,
  onAddToCart,
  loading = false,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          {food.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {food.categories?.categoryName ||
            "Tanpa kategori"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {food.description}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          color="success.main"
        >
          Rp {Number(food.price).toLocaleString("id-ID")}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={() => onAddToCart(food)}
          disabled={loading || food.isCart}
        >
          {food.isCart
            ? "Sudah di Keranjang"
            : loading
              ? "Menambahkan..."
              : "Tambah ke Keranjang"}
        </Button>
      </Box>
    </Card>
  );
}

export default FoodCard;