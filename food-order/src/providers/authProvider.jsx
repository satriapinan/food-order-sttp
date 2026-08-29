import { useMemo, useState } from "react";
import { AuthContext } from "./authcontext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // mengolah dulu response dari backend sebelum disimpan,
  // soalnya bentuknya nested: { user: {...}, token: "..." } ingat itu tasya
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
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};