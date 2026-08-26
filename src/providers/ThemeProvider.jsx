import { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

export const ThemeProvider = ({ children }) => {
  const [modeTema, setModeTema] = useState(
    localStorage.getItem("theme") || "light",
  );

  const toggleTheme = () => {
    const modeBaru = modeTema === "light" ? "dark" : "light";
    localStorage.setItem("theme", modeBaru);
    setModeTema(modeBaru);
  };

  const tema = useMemo(
    () =>
      createTheme({
        palette: {
          mode: modeTema,
          primary: {
            main: "#8b0000",
          },
        },
      }),
    [modeTema],
  );

  const contextValue = useMemo(
    () => ({ mode: modeTema, toggleTheme }),
    [modeTema],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={tema}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
