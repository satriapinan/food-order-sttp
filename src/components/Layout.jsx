import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Tooltip,
  Avatar,
  Chip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const Layout = ({ children, maxWidth = "lg", showHeader = true }) => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isDark = mode === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDark ? "#121212" : "#fdfbf7",
        backgroundImage: isDark
          ? "radial-gradient(ellipse at top, #1e1e24 0%, #121212 70%)"
          : "linear-gradient(135deg, #fff5f0 0%, #fdfbf7 100%)",
        color: isDark ? "#f5f6fa" : "#2d3436",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header / Navbar */}
      {showHeader && (
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: isDark
              ? "rgba(30, 30, 36, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.06)",
            color: isDark ? "#ffffff" : "#2d3436",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Container maxWidth={maxWidth}>
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              {/* Brand Logo & Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/menu")}
              >
                <Avatar
                  sx={{
                    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                    boxShadow: "0 4px 12px rgba(255, 126, 95, 0.3)",
                    width: 40,
                    height: 40,
                  }}
                >
                  <RestaurantMenuIcon sx={{ color: "#fff" }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="900"
                    sx={{
                      background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.5px",
                      lineHeight: 1.2,
                    }}
                  >
                    FoodOrder
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDark ? "#a4b0be" : "#747d8c",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    Delicious food at your fingertips
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons (Dark Mode Toggle & Auth) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* User Greeting (if logged in) */}
                {user && (
                  <Chip
                    label={`Hi, ${user.fullname || user.username || "User"}`}
                    size="small"
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      fontWeight: 600,
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(255, 126, 95, 0.1)",
                      color: isDark ? "#f5f6fa" : "#ff7e5f",
                    }}
                  />
                )}

                {/* Dark Mode Toggle Button */}
                <Tooltip
                  title={isDark ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
                >
                  <Button
                    onClick={toggleTheme}
                    variant="outlined"
                    size="small"
                    startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
                    sx={{
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: { xs: 1.5, sm: 2 },
                      py: 0.8,
                      borderColor: isDark
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 126, 95, 0.3)",
                      color: isDark ? "#feca57" : "#ff7e5f",
                      backgroundColor: isDark
                        ? "rgba(254, 202, 87, 0.08)"
                        : "rgba(255, 126, 95, 0.05)",
                      "&:hover": {
                        borderColor: isDark ? "#feca57" : "#ff7e5f",
                        backgroundColor: isDark
                          ? "rgba(254, 202, 87, 0.15)"
                          : "rgba(255, 126, 95, 0.12)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {isDark ? "Light" : "Dark"}
                  </Button>
                </Tooltip>

                {/* Logout Button (if logged in) */}
                {user && (
                  <Tooltip title="Keluar / Logout">
                    <IconButton
                      onClick={handleLogout}
                      size="small"
                      sx={{
                        backgroundColor: isDark
                          ? "rgba(255, 255, 255, 0.06)"
                          : "rgba(0, 0, 0, 0.04)",
                        color: isDark ? "#ff6b6b" : "#e74c3c",
                        borderRadius: "12px",
                        p: 1,
                        "&:hover": {
                          backgroundColor: "rgba(231, 76, 60, 0.15)",
                        },
                      }}
                    >
                      <LogoutIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, sm: 4 } }}>
        <Container maxWidth={maxWidth}>{children || <Outlet />}</Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(0, 0, 0, 0.05)",
          color: isDark ? "#747d8c" : "#a4b0be",
        }}
      >
        <Typography variant="body2" fontSize="13px">
          © {new Date().getFullYear()} FoodOrder App • All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
