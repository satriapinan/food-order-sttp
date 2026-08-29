import { useCallback, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", newMode);
    setMode(newMode);
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
