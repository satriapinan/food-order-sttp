import { useContext } from "react";
// Pastikan alamat import ini mengarah ke file tempat kamu membuat ThemeContext tadi
import { ThemeContext } from "../providers/ThemeContext";

export const useTheme = () => {
  return useContext(ThemeContext);
};
