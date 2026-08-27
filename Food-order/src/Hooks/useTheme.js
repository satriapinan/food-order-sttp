import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeContext";

export const useTheme = () => {
    return useContext(ThemeContext);
};