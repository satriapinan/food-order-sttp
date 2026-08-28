import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function FoodCard({
  food,
  onAddToCart,
  loading = false,
}) {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 270,

        display: "flex",
        flexDirection: "column",

        borderRadius: 3,

        overflow: "hidden",

        background:
          "linear-gradient(145deg, #111a14 0%, #080d0a 100%)",

        border:
          "1px solid rgba(34,197,94,0.14)",

        color: "#ffffff",

        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",

        "&:hover": {
          transform: "translateY(-6px)",

          borderColor:
            "rgba(34,197,94,0.5)",

          boxShadow:
            "0 20px 45px rgba(0,0,0,0.45), 0 0 25px rgba(34,197,94,0.08)",
        },
      }}
    >
      {/* TOP */}

      <Box
        sx={{
          height: 130,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          position: "relative",

          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.15), transparent 65%)",
        }}
      >
        <RestaurantIcon
          sx={{
            fontSize: 58,
            color: "#22c55e",
            opacity: 0.9,
          }}
        />

        <Chip
          label={
            food.categories?.categoryName ||
            "Food"
          }
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,

            backgroundColor:
              "rgba(34,197,94,0.12)",

            color: "#86efac",

            border:
              "1px solid rgba(34,197,94,0.25)",

            fontWeight: 700,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      {/* CONTENT */}

      <CardContent
        sx={{
          flex: 1,

          display: "flex",
          flexDirection: "column",

          p: 2.2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 800,
            mb: 0.7,
          }}
        >
          {food.name}
        </Typography>

        <Typography
          sx={{
            color: "#8f9b92",
            fontSize: "0.82rem",
            lineHeight: 1.5,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",

            mb: 2,
          }}
        >
          {food.description ||
            "Makanan pilihan dengan cita rasa terbaik."}
        </Typography>

        <Box
          sx={{
            mt: "auto",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: "#4ade80",
              fontWeight: 900,
              fontSize: "1rem",
            }}
          >
            {formatRupiah(food.price)}
          </Typography>

          <Button
            variant="contained"
            size="small"
            disabled={loading}
            onClick={() =>
              onAddToCart(food)
            }
            startIcon={
              <ShoppingCartOutlinedIcon />
            }
            sx={{
              minWidth: 0,

              px: 1.5,
              py: 1,

              borderRadius: 2,

              background:
                "linear-gradient(135deg, #22c55e, #15803d)",

              color: "#ffffff",

              fontWeight: 800,

              boxShadow:
                "0 6px 18px rgba(34,197,94,0.2)",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #4ade80, #16a34a)",

                boxShadow:
                  "0 8px 24px rgba(34,197,94,0.3)",
              },
            }}
          >
            {loading ? "..." : "Tambah"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FoodCard;