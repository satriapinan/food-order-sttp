import { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", newMode);
    setMode(newMode);
  };

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
