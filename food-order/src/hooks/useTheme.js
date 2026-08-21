import { useContext } from "react";
import { ThemeContext } from "../providers/themeContext";

export const useTheme = () => useContext(ThemeContext);