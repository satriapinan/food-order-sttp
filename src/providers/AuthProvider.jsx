import { useMemo,useState } from "react";
import {AuthContext} from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    );
    
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const contextValue = useMemo(() => ({user,login,logout }), [user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
