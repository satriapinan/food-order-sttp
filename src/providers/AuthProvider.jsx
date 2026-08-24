import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser, registerUser } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // =========================
  // LOGIN
  // =========================

  const login = async ({ username, password }) => {
    try {
      const data = await loginUser({
        username,
        password,
      });

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login gagal";

      throw new Error(message, { cause: error });
    }
  };

  // =========================
  // REGISTER
  // =========================

  const register = async ({ username, fullname, password, retypePassword }) => {
    try {
      const data = await registerUser({
        username,
        fullname,
        password,
        retypePassword,
      });

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Register gagal";

      throw new Error(message, { cause: error });
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // =========================
  // CONTEXT
  // =========================

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
