import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const login = (userData) => {
    if (!userData) return;
    const userObj = userData.user || userData.data || userData;
    const data = {
      id: userObj.id || userObj._id || userObj.username || "1",
      username: userObj.username || userObj.email || "",
      fullname: userObj.fullname || userObj.fullName || userObj.name || userObj.username || "",
      email: userObj.email || userObj.username || "",
      token: userData.token || userObj.token || "dummy-token",
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