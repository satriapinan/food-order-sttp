import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const isDark = mode === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoginPage =
    location.pathname === "/login";

  const isRegisterPage =
    location.pathname === "/register";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark
          ? "#151515"
          : "#ffffff",
        color: isDark
          ? "#ffffff"
          : "#000000",
        transition:
          "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* =========================
          NAVBAR
      ========================= */}

      {!isLoginPage && !isRegisterPage && (
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: isDark
              ? "#0d0d0d"
              : "#ffffff",

            borderBottom: isDark
              ? "1px solid #252525"
              : "1px solid #e5e5e5",

            color: isDark
              ? "#ffffff"
              : "#111111",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: 2,
            }}
          >
            {/* LOGO */}

            <Typography
              variant="h6"
              component={Link}
              to="/menu"
              sx={{
                textDecoration: "none",
                color: "#22c55e",
                fontWeight: 800,
              }}
            >
              Food Order
            </Typography>

            {/* NAVIGATION */}

            {isAuthenticated && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  component={Link}
                  to="/menu"
                  sx={{
                    color:
                      isDark
                        ? "#ffffff"
                        : "#111111",
                    fontWeight:
                      location.pathname ===
                      "/menu"
                        ? 700
                        : 500,
                  }}
                >
                  Menu
                </Button>

                <Button
                  component={Link}
                  to="/cart"
                  sx={{
                    color:
                      isDark
                        ? "#ffffff"
                        : "#111111",
                    fontWeight:
                      location.pathname ===
                      "/cart"
                        ? 700
                        : 500,
                  }}
                >
                  🛒 Cart
                </Button>

                {/* THEME */}

                <Button
                  onClick={toggleTheme}
                  variant="text"
                  size="small"
                  sx={{
                    minWidth: "auto",
                    padding:
                      "8px 12px",
                    borderRadius: "8px",

                    backgroundColor:
                      isDark
                        ? "#222222"
                        : "#f5f5f5",

                    color:
                      isDark
                        ? "#ffffff"
                        : "#151515",

                    "&:hover": {
                      backgroundColor:
                        isDark
                          ? "#333333"
                          : "#e5e5e5",
                    },
                  }}
                >
                  {isDark
                    ? "☀️ Light"
                    : "🌙 Dark"}
                </Button>

                {/* LOGOUT */}

                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* =========================
          CONTENT
      ========================= */}

      {children}
    </Box>
  );
};

export default AppLayout;