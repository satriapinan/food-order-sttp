import {useContext} from "react";
import { ThemeContext } from "../providers/ThemeContex";

export const useTheme = () => {
    return useContext(ThemeContext);
};