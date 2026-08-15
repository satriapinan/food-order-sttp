import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import { useAuth } from "../hooks/useAuth";

function FoodOrderPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Food Order
        </Typography>
        <AppButton onClick={handleLogout} sx={{ width: "auto" }}>
          Logout
        </AppButton>
      </Box>

      <Typography variant="body1" sx={{ marginTop: "16px", color: "#888" }}>
        Selamat datang, {user ? user.email : "Guest"}!
      </Typography>
    </Box>
  );
}

export default FoodOrderPage;
