import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";
  const location = useLocation();

  const navItems = [
    { label: "Menu Makanan", path: "/food-menu" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Example", path: "/example" },
  ];

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
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "10px 16px", sm: "12px 32px" },
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(173, 20, 87, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/food-menu"
          sx={{
            fontWeight: 800,
            color: "#c2185b",
            textDecoration: "none",
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🍽️ FoodOrder
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, flexWrap: "wrap" }}>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/food-menu" && location.pathname === "/food-order");
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                size="small"
                sx={{
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? "#c2185b" : isDark ? "#e2e8f0" : "#4b5563",
                  backgroundColor: isActive
                    ? isDark
                      ? "rgba(194, 24, 91, 0.25)"
                      : "#fce4ec"
                    : "transparent",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  textTransform: "none",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(194, 24, 91, 0.2)"
                      : "#f8bbd0",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}

          <Button
            onClick={toggleTheme}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "20px",
              borderColor: isDark ? "#555" : "#f48fb1",
              color: isDark ? "#fff" : "#c2185b",
              textTransform: "none",
              fontWeight: 600,
              ml: 0.5,
              "&:hover": {
                borderColor: "#c2185b",
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#fce4ec",
              },
            }}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </Box>
      </Box>

      <Box>{children}</Box>
    </Box>
  );
};

export default AppLayout;