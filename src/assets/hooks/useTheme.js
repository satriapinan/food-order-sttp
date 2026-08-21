import { useContext } from "react";
import { ThemeContext } from "../../components/providers/ThemeContext";

export const useTheme = () => {
    return useContext(ThemeContext);
};