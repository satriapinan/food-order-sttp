import { createContext, useState, useMemo } from "react";

// 1. Membuat dan mengekspor Context
export const AuthContext = createContext();

// 2. Membuat dan mengekspor Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const login = (userData) => {
    // Menyusun data sesuai dengan struktur dari API backend
    const data = {
      id: userData.user?.id,
      username: userData.user?.username,
      fullname: userData.user?.fullname,
      token: userData.token,
    };
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
