import { useTheme } from "../hooks/useTheme";
import { Box, Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#f97316", // Deep Orange
          },
          secondary: {
            main: "#475569", // Slate Gray
          },
          background: {
            default: mode === "dark" ? "#121212" : "#f9fafb",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button onClick={toggleTheme} variant="outlined" size="small">
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
