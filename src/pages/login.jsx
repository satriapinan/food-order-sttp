import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom"; // 1. Gunakan useNavigate, hapus useParams

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";

function LoginPage() {
  const navigate = useNavigate(); // 2. Inisialisasi fungsi navigasi
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log("Data Login:", formData);
    alert(`Login Berhasil!\nEmail: ${formData.email}`);
    
    // 3. Tambahkan baris ini agar halaman berpindah ke Food Menu
    navigate("/menu");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
            Masuk Akun
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Silakan masukkan email dan password kamu
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
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

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit">MASUK</AppButton>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Daftar di sini
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;