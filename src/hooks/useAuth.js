import { useContext } from "react";
// Pastikan alamat import ini mengarah ke file tempat kamu membuat AuthContext tadi
import { AuthContext } from "../providers/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
