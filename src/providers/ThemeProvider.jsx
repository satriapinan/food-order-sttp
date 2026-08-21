import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};