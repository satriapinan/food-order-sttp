import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

function FoodCard({ food, onAddToCart, loading = false }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#22c55e",
          boxShadow: "0 10px 30px rgba(34,197,94,0.12)",
        },
      }}
    >
      {/* FOOD IMAGE / PLACEHOLDER */}

      <Box
        sx={{
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #06140c, #151515)",
          color: "#22c55e",
          fontSize: 60,
        }}
      >
        🍽️
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2.5,
        }}
      >
        {/* NAME */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {food.name}
        </Typography>

        {/* CATEGORY */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {food.categories?.categoryName || "Kategori"}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            minHeight: 42,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {food.description || "Tidak ada deskripsi."}
        </Typography>

        {/* PRICE */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: "#22c55e",
            mb: 2,
          }}
        >
          {formatPrice(food.price)}
        </Typography>

        {/* BUTTON */}

        <Box sx={{ mt: "auto" }}>
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={() => onAddToCart(food)}
            sx={{
              py: 1.2,
              borderRadius: 2,
              backgroundColor: "#22c55e",
              color: "#fff",
              fontWeight: "bold",

              "&:hover": {
                backgroundColor: "#16a34a",
              },

              "&.Mui-disabled": {
                backgroundColor: "#166534",
                color: "#d1fae5",
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={22}
                sx={{ color: "#fff" }}
              />
            ) : food.isCart ? (
              "Sudah di Keranjang"
            ) : (
              "Tambah ke Keranjang"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FoodCard;