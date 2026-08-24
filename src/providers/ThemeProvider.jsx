import { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    setMode((currentMode) => {
      const newMode =
        currentMode === "light"
          ? "dark"
          : "light";

      localStorage.setItem("theme", newMode);

      return newMode;
    });
  };

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}