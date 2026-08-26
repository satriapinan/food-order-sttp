import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { validateRegisterForm } from "./registerValidation";

export const Register = ({ onNavigate }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
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

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const validation = validateRegisterForm({
      ...form,
      existingUsers,
    });

    if (!validation.valid) {
      setError(validation.message);
      setMessage("");
      return;
    }

    const newUser = {
      username: form.username.trim(),
      email: form.email.trim(),
      fullName: form.fullName.trim(),
      password: form.password,
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    setError("");
    setMessage("Akun berhasil dibuat. Silakan login.");

    setForm({
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      onNavigate("login");
    }, 800);
  };

  return (
    <AppLayout
      title="Register"
      actions={navItems.map(({ label, page }) => (
        <button
          key={label}
          type="button"
          onClick={() => onNavigate(page)}
          style={{
            border: "none",
            background: page === "register" ? "#2563eb" : "#e0e7ff",
            color: page === "register" ? "white" : "#1e3a8a",
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
            maxWidth: "460px",
            padding: "32px",
            borderRadius: "18px",
            background: "white",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.12)",
          }}
        >
          <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
            Buat Akun Baru
          </h2>
          <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
            Isi data diri Anda di bawah ini
          </p>

          {error && (
            <p style={{ color: "#dc2626", marginBottom: "12px", textAlign: "center" }}>{error}</p>
          )}

          {message && (
            <p style={{ color: "#15803d", marginBottom: "12px", textAlign: "center" }}>{message}</p>
          )}

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Username
          </label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Masukkan username"
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
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Masukkan full name"
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
              marginBottom: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Konfirmasi password"
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
            Register
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Register;
