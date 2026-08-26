import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppSnackbar from "../components/AppSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        const token =
          res.data?.token ||
          res.data?.data?.token ||
          res.data?.accessToken ||
          res.data?.data?.accessToken;

        if (token) {
          localStorage.setItem("token", token);
        }

        showSnackbar("Login berhasil! Selamat datang.", "success");
        if (login) login(res.data);

        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      } catch (err) {
        showSnackbar(
          err.response?.data?.message || "Login gagal! Cek username/password.",
          "error"
        );
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F4F7F2",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: "920px",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Otomatis Kiri-Kanan di Laptop/Desktop
        }}
      >
        {/* Sisi Kiri: Branding & Gambar */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#2B3A29",
            color: "#fff",
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundImage: `linear-gradient(135deg, #2B3A29 0%, #1A2418 100%)`,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#8CB369", mb: 2 }}>
              Kuliner Nusantara 🍡
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1.5 }}>
              Selamat Datang Kembali! 👋
            </Typography>
            <Typography variant="body2" sx={{ color: "#D9E9CF", opacity: 0.9 }}>
              Nikmati kemudahan memesan aneka kuliner dan kue tradisional khas Nusantara langsung dalam satu genggaman.
            </Typography>
          </Box>

          <Box
            component="img"
            src={HERO_IMAGE_URL}
            alt="Kuliner Nusantara"
            sx={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "12px",
              my: 3,
              boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
            }}
          />

          <Typography variant="caption" sx={{ color: "#8CB369", opacity: 0.7 }}>
            © 2026 Food Order Tradisional. All rights reserved.
          </Typography>
        </Box>

        {/* Sisi Kanan: Form Login */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "#fff",
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#1F2E1C", mb: 0.5 }}>
              Login
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Masuk ke akun Food Order kamu
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <AppTextField
                label="Username"
                name="username"
                placeholder="Masukkan Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />

              <AppTextField
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                <AppButton type="submit" fullWidth>
                  Login
                </AppButton>
              </Box>
            </Box>
          </form>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: "#555" }}>
            Belum punya akun?{" "}
            <Link to="/register" style={{ color: "#2B3A29", fontWeight: "bold", textDecoration: "none" }}>
              Daftar
            </Link>
          </Typography>
        </Box>
      </Paper>

      <AppSnackbar
        open={snackbar?.open || false}
        message={snackbar?.message || ""}
        severity={snackbar?.severity || "info"}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default LoginPage;