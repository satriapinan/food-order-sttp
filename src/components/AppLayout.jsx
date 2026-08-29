import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = mode === "dark";
  const navigationItems = user?.token
    ? [{ label: "Food Order", to: "/food-order" }, { label: "Example", to: "/example" }]
    : [{ label: "Login", to: "/login" }, { label: "Register", to: "/register" }, { label: "Example", to: "/example" }];

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
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          padding: "12px 16px",
        }}
      >
        <Box component="nav" aria-label="Navigasi utama" sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {navigationItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === "/login"}
              size="small"
              sx={{
                color: isDark ? "#fff" : "#000",
                textTransform: "none",
                "&.active": {
                  color: isDark ? "#90caf9" : "#1976d2",
                  fontWeight: "bold",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {user?.token && <Button onClick={logout} size="small" sx={{ color: isDark ? "#fff" : "#000" }}>Logout</Button>}
          <Button
            onClick={toggleTheme}
            variant="text"
            size="small"
            sx={{
              backgroundColor: isDark ? "#2a2a2a" : "#fff",
              color: isDark ? "#fff" : "#000",
              "&:hover": { backgroundColor: isDark ? "#3a3a3a" : "#f0f0f0" },
            }}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
