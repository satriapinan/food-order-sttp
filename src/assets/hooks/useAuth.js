import { useContext } from "react";
import { AuthContext } from "../../components/providers/AuthContext";

export const useAuth = () => {
    return useContext(AuthContext);
};