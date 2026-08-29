import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    getStoredUser,
  );

  const login = (userData) => {
   const data = {
    id: userData.user.id,
    username: userData.user.username,
    fullname: userData.user.fullname,
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
