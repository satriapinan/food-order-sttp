import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          padding: "12px 16px",
        }}
      >
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Halo, {user.username} 👋
            </Typography>

            <Button
              onClick={handleLogout}
              variant="outlined"
              color="error"
              size="small"
              sx={{
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                borderWidth: "2px",
                "&:hover": { borderWidth: "2px" },
              }}
            >
              Logout
            </Button>
          </Box>
        )}

        <Button
          onClick={toggleTheme}
          sx={{
            borderRadius: "30px",
            padding: "8px 24px",
            fontWeight: "bold",
            letterSpacing: "1px",
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
            color: isDark ? "#ffffff" : "#121212",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.08)",
              transform: "translateY(-3px)",
              boxShadow: isDark
                ? "0 6px 20px rgba(255,255,255,0.15)"
                : "0 6px 20px rgba(0,0,0,0.15)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          {isDark ? "🌞 Light" : "🌙 Dark"}
        </Button>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
