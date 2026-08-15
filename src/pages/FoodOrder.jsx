import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function FoodOrderPage() {
  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Food Order
      </Typography>
      <Typography variant="body2" sx={{ color: "#888" }}>
        Selamat datang di halaman Food Order!
      </Typography>
    </Box>
  );
}

export default FoodOrderPage;
