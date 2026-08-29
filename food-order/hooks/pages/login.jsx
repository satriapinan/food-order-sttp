import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../components/hooks/useAuth";

const Login = ({ onNavigate }) => {
  const { login: setAuthUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Menu", page: "menu" },
    { label: "Login", page: "login" },
    { label: "Register", page: "register" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const matchedUser = users.find(
      (user) =>
        user.email?.toLowerCase() === form.email.trim().toLowerCase() &&
        user.password === form.password
    );

    if (!matchedUser) {
      setError("Email atau password salah.");
      setMessage("");
      return;
    }

    const userData = {
      username: matchedUser.username,
      email: matchedUser.email,
      fullName: matchedUser.fullName,
    };

    setAuthUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setError("");
    setMessage("Login berhasil.");

    setForm({ email: "", password: "" });

    setTimeout(() => {
      onNavigate("menu");
    }, 800);
  };

  return (
    <AppLayout
      title="Login"
      actions={navItems.map(({ label, page }) => (
        <button
          key={label}
          type="button"
          onClick={() => onNavigate(page)}
          style={{
            border: "none",
            background: page === "login" ? "#2563eb" : "#e0e7ff",
            color: page === "login" ? "white" : "#1e3a8a",
            padding: "10px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          {label}
        </button>
      ))}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "32px",
            borderRadius: "18px",
            background: "white",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.12)",
          }}
        >
          <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
            Selamat Datang Kembali
          </h2>
          <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
            Silakan masuk dengan akun Anda
          </p>

          {error && (
            <p style={{ color: "#dc2626", marginBottom: "12px", textAlign: "center" }}>{error}</p>
          )}

          {message && (
            <p style={{ color: "#15803d", marginBottom: "12px", textAlign: "center" }}>{message}</p>
          )}

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="nama@gmail.com"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Login;
