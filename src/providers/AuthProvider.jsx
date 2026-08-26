import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [pengguna, setPengguna] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const login = (dataPengguna) => {
    const data = {
      id: dataPengguna.user.id,
      username: dataPengguna.user.username,
      fullname: dataPengguna.user.fullname,
      token: dataPengguna.token,
    };
    localStorage.setItem("user", JSON.stringify(data));
    setPengguna(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setPengguna(null);
  };

  const contextValue = useMemo(
    () => ({ user: pengguna, login, logout }),
    [pengguna],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
