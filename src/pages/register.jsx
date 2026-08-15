import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    console.log("Data Register:", formData);
    alert(`Pendaftaran Berhasil!\nSelamat datang, ${formData.fullName}`);

    navigate("/login");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          marginBottom: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            borderRadius: 3,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Daftar Akun
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Buat akun baru untuk mulai memesan
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <AppInput
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <AppInput
              label="Alamat Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <AppInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <AppInput
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit">DAFTAR</AppButton>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Masuk di sini
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;