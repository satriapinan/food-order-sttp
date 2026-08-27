import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const buttonSx = {
    minWidth: 0,
    backgroundColor: isDark ? "#2a2a2a" : "#fff",
    color: isDark ? "#fff" : "#000",
    "&:hover": {
      backgroundColor: isDark ? "#3a3a3a" : "#e0e0e0",
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
          padding: "12px 16px",
        }}
      >
        {user ? (
          <Box
            component={Link}
            to="/menu"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <RestaurantIcon sx={{ color: "#6D5BD0" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: isDark ? "#ccc" : "#555" }}
            >
              Hi, {user.fullname}!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RestaurantIcon sx={{ color: "#6D5BD0" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: isDark ? "#fff" : "#2E2A47" }}
            >
              Food Order
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: "6px" }}>
          <Button
            onClick={toggleTheme}
            variant="text"
            size="small"
            aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            sx={buttonSx}
          >
            {isDark ? (
              <LightModeOutlinedIcon fontSize="small" />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            )}
          </Button>

          {user && (
            <Button
              onClick={handleLogout}
              variant="text"
              size="small"
              aria-label="Logout"
              sx={{
                ...buttonSx,
                color: "#e53935",
                "&:hover": { backgroundColor: "#e5393514" },
              }}
            >
              <LogoutOutlinedIcon fontSize="small" />
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;