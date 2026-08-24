import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api";

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
      const response = await api.post(
        "/user-management/users/sign-in",
        {
          username,
          password,
        }
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setToken(data.token);
      setUser(data.user);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login gagal";

      throw new Error(message, { cause: error });
    }
  };

  // =========================
  // REGISTER
  // =========================

  const register = async ({
    username,
    fullname,
    password,
    retypePassword,
  }) => {
    try {
      const response = await api.post(
        "/user-management/users/sign-up",
        {
          username,
          fullname,
          password,
          retypePassword,
        }
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Register gagal";

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
  // CONTEXT VALUE
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
    [user, token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}