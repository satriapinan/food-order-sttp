import { Box, Button, Paper, IconButton, Tooltip } from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useTheme } from "../hooks/useTheme";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AppLayout({ children }) {
  const { mode, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isDark = mode === "dark";

  const isPublicPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor: isDark
          ? "#101813"
          : "#f4f7f5",

        color: isDark
          ? "#ffffff"
          : "#111111",

        transition:
          "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,

          width: "100%",

          borderRadius: 0,

          backgroundColor: isDark
            ? "#151d18"
            : "#ffffff",

          borderBottom: isDark
            ? "1px solid #27362c"
            : "1px solid #e2e8e4",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",

            minHeight: {
              xs: 64,
              sm: 70,
            },

            margin: "0 auto",

            px: {
              xs: 1.5,
              sm: 3,
            },

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            gap: 1,

            boxSizing: "border-box",
          }}
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Box
            onClick={() =>
              !isPublicPage && navigate("/menu")
            }
            sx={{
              display: "flex",
              alignItems: "center",

              cursor: isPublicPage
                ? "default"
                : "pointer",

              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 36,
                  sm: 42,
                },

                height: {
                  xs: 36,
                  sm: 42,
                },

                borderRadius: "12px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background:
                  "linear-gradient(135deg, #22c55e, #15803d)",

                color: "#ffffff",

                mr: {
                  xs: 0.8,
                  sm: 1.2,
                },

                boxShadow:
                  "0 5px 15px rgba(34,197,94,0.20)",
              }}
            >
              <MenuBookOutlinedIcon
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 23,
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                fontSize: 20,

                fontWeight: 900,

                color: "#22c55e",

                letterSpacing: "-0.5px",
              }}
            >
              Food Order
            </Box>
          </Box>

          {/* =================================================
              PUBLIC PAGE
              LOGIN / REGISTER
          ================================================= */}

          {isPublicPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ThemeButton
                isDark={isDark}
                toggleTheme={toggleTheme}
              />
            </Box>
          ) : (
            /* =================================================
                AUTHENTICATED NAVIGATION
            ================================================= */

            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                gap: {
                  xs: 0.3,
                  sm: 0.8,
                },

                flexShrink: 0,
              }}
            >
              {/* =================================================
                  MENU
              ================================================= */}

              <Button
                onClick={() => navigate("/menu")}
                sx={{
                  minWidth: {
                    xs: 44,
                    sm: 88,
                  },

                  height: {
                    xs: 46,
                    sm: 44,
                  },

                  px: {
                    xs: 0.8,
                    sm: 1.5,
                  },

                  borderRadius: 2.5,

                  textTransform: "none",

                  fontWeight: 800,

                  color:
                    location.pathname === "/menu"
                      ? "#22c55e"
                      : isDark
                        ? "#d8dedb"
                        : "#333333",

                  backgroundColor:
                    location.pathname === "/menu"
                      ? isDark
                        ? "#1d2b21"
                        : "#edf8f0"
                      : "transparent",

                  "&:hover": {
                    backgroundColor: isDark
                      ? "#1e2a22"
                      : "#edf8f0",
                  },
                }}
              >
                <MenuBookOutlinedIcon
                  sx={{
                    fontSize: {
                      xs: 25,
                      sm: 21,
                    },
                  }}
                />

                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline",
                    },

                    ml: 0.7,
                  }}
                >
                  Menu
                </Box>
              </Button>

              {/* =================================================
                  CART
              ================================================= */}

              <Button
                onClick={() => navigate("/cart")}
                sx={{
                  minWidth: {
                    xs: 44,
                    sm: 88,
                  },

                  height: {
                    xs: 46,
                    sm: 44,
                  },

                  px: {
                    xs: 0.8,
                    sm: 1.5,
                  },

                  borderRadius: 2.5,

                  textTransform: "none",

                  fontWeight: 800,

                  color:
                    location.pathname === "/cart"
                      ? "#22c55e"
                      : isDark
                        ? "#d8dedb"
                        : "#333333",

                  backgroundColor:
                    location.pathname === "/cart"
                      ? isDark
                        ? "#1d2b21"
                        : "#edf8f0"
                      : "transparent",

                  "&:hover": {
                    backgroundColor: isDark
                      ? "#1e2a22"
                      : "#edf8f0",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{
                    fontSize: {
                      xs: 25,
                      sm: 21,
                    },
                  }}
                />

                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline",
                    },

                    ml: 0.7,
                  }}
                >
                  Cart
                </Box>
              </Button>

              {/* =================================================
                  THEME
              ================================================= */}

              <ThemeButton
                isDark={isDark}
                toggleTheme={toggleTheme}
              />

              {/* =================================================
                  LOGOUT
              ================================================= */}

              <Button
                onClick={handleLogout}
                sx={{
                  minWidth: {
                    xs: 44,
                    sm: 88,
                  },

                  height: {
                    xs: 46,
                    sm: 44,
                  },

                  px: {
                    xs: 0.8,
                    sm: 1.5,
                  },

                  borderRadius: 2.5,

                  textTransform: "none",

                  fontWeight: 800,

                  color: "#ef4444",

                  "&:hover": {
                    backgroundColor: isDark
                      ? "#2a1919"
                      : "#fff0f0",
                  },
                }}
              >
                <LogoutOutlinedIcon
                  sx={{
                    fontSize: {
                      xs: 25,
                      sm: 21,
                    },
                  }}
                />

                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline",
                    },

                    ml: 0.7,
                  }}
                >
                  Keluar
                </Box>
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <Box
        sx={{
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/* =============================================================
   THEME BUTTON
============================================================= */

function ThemeButton({ isDark, toggleTheme }) {
  return (
    <Tooltip
      title={isDark ? "Mode Terang" : "Mode Gelap"}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        aria-label={
          isDark
            ? "Aktifkan mode terang"
            : "Aktifkan mode gelap"
        }
        sx={{
          width: {
            xs: 46,
            sm: 42,
          },

          height: {
            xs: 46,
            sm: 42,
          },

          borderRadius: "12px",

          color: isDark
            ? "#facc15"
            : "#17221b",

          backgroundColor: isDark
            ? "#222d25"
            : "#edf2ee",

          border: isDark
            ? "1px solid #334238"
            : "1px solid #dce5df",

          flexShrink: 0,

          "&:hover": {
            backgroundColor: isDark
              ? "#2d3a31"
              : "#e3ebe5",
          },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon
            sx={{
              fontSize: {
                xs: 25,
                sm: 22,
              },
            }}
          />
        ) : (
          <DarkModeOutlinedIcon
            sx={{
              fontSize: {
                xs: 25,
                sm: 22,
              },
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default AppLayout;