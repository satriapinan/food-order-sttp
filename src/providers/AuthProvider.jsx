import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const register = (userData) => {
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const userEmail = userData.email?.trim()?.toLowerCase();
        
        const filteredUsers = existingUsers.filter(
            (u) => u.email?.trim()?.toLowerCase() !== userEmail
        );
        
        const newUser = {
            name: userData.name?.trim(),
            email: userData.email?.trim(),
            password: userData.password,
        };
        
        const updatedUsers = [...filteredUsers, newUser];
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
        localStorage.setItem("lastRegisteredUser", JSON.stringify(newUser));
        return newUser;
    };
    
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    
    const contextValue = useMemo(() => ({ user, login, masuk: login, register, logout }), [user]);
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};