import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";

export const useTheme = () => {
    return useContext(ThemeContext);
};