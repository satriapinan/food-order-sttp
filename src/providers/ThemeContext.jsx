import { createContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// 1. Mengekspor Context
export const ThemeContext = createContext();

// 2. Mengekspor Provider yang membungkus aplikasi dengan ThemeContext & MUI ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#ff7e5f",
          },
          secondary: {
            main: "#feb47b",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#fdfbf7",
            paper: mode === "dark" ? "#1e1e24" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#f5f6fa" : "#2d3436",
            secondary: mode === "dark" ? "#a4b0be" : "#636e72",
          },
        },
        typography: {
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        },
      }),
    [mode]
  );

  const contextValue = useMemo(() => ({ mode, toggleTheme, theme }), [mode, theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
