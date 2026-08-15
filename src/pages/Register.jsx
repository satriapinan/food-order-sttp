import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Semua field harus diisi!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    console.log("Register data:", form);
    alert("Register berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <AppCard>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
          Register
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", marginBottom: "24px" }}>
          Buat akun Food Order baru
        </Typography>

        <AppTextField
          label="Nama Lengkap"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <AppTextField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <AppTextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <AppTextField
          label="Konfirmasi Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <AppButton onClick={handleRegister}>Register</AppButton>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "16px" }}
        >
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default RegisterPage;
