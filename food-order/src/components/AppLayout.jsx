import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const buttonSx = {
    backgroundColor: isDark ? "#ffffff0a" : "#0000000a",
    color: isDark ? "#ccc" : "#555",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "0.8rem",
    padding: "4px 12px",
    minWidth: "unset",
    "&:hover": {
      backgroundColor: isDark ? "#ffffff1a" : "#00000014",
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
        transition: "background-color 0.3s ease",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          borderBottom: isDark ? "1px solid #333" : "1px solid #eee",
        }}
      >
        {user && (
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: isDark ? "#ccc" : "#555" }}
          >
            Hi, {user.fullname}!
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: "6px" }}>
          <Button onClick={toggleTheme} variant="text" size="small" sx={buttonSx}>
            {isDark ? "Light" : "Dark"}
          </Button>

          {user && (
            <Button
              onClick={() => navigate("/cart")}
              variant="text"
              size="small"
              startIcon={<ShoppingCartIcon fontSize="small" />}
              sx={buttonSx}
            >
              Keranjang
            </Button>
          )}

          {user && (
            <Button
              onClick={handleLogout}
              variant="text"
              size="small"
              sx={{
                ...buttonSx,
                color: "#e53935",
                "&:hover": { backgroundColor: "#e5393514" },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;