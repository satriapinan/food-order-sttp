import { useContext } from "react";
import { AuthContext } from "../providers/authcontext";

export const useAuth = () => useContext(AuthContext);