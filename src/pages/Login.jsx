import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    console.log("Login data:", form);
    alert("Login berhasil!");
    navigate("/food-order");
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
          Login
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", marginBottom: "24px" }}>
          Masuk ke akun Food Order kamu
        </Typography>

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

        <AppButton onClick={handleLogin}>Login</AppButton>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "16px" }}
        >
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>
            Register
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default LoginPage;
