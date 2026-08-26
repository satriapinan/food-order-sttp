import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

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
          justifyContent: user ? "space-between" : "flex-end",
          alignItems: "center",
          padding: "8px 16px",
          borderBottom: `1px solid ${isDark ? "#ffffff14" : "#00000014"}`,
        }}
      >
        {user && (
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: isDark ? "#ccc" : "#555" }}
          >
            Hi, {user.fullname || user.username}!
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: "6px" }}>
          <Button onClick={toggleTheme} variant="text" size="small" sx={buttonSx}>
            {isDark ? "Light" : "Dark"}
          </Button>

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