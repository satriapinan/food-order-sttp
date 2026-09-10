import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../hooks/useThemes";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme, isDark } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#0f172a" : "#f8fafc",
        transition: "background-color 0.3s ease, color 0.3s ease",
        color: isDark ? "#f8fafc" : "#0f172a",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 24px",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Button
          onClick={toggleTheme}
          variant="contained"
          size="small"
          startIcon={isDark ? <LightModeIcon sx={{ color: "#f59e0b" }} /> : <DarkModeIcon sx={{ color: "#6366f1" }} />}
          sx={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            boxShadow: 2,
            borderRadius: 3,
            px: 2,
            py: 0.8,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: isDark ? "#334155" : "#f1f5f9",
            },
          }}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;