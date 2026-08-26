import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";

// Skema Validasi Yup untuk Register
const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username minimal 3 karakter")
    .required("Username wajib diisi"),
  fullName: Yup.string()
    .required("Nama lengkap wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const login = auth?.login || (() => {});
  const theme = useTheme();
  const isDark = theme?.mode === "dark";
  const toggleTheme = theme?.toggleTheme;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const saveLocalUser = (userData) => {
    try {
      const existing = JSON.parse(localStorage.getItem("local_users") || "[]");
      const filtered = existing.filter(
        (u) => u.username !== userData.username && u.email !== userData.email
      );
      filtered.push(userData);
      localStorage.setItem("local_users", JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const payload = {
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };

      // Simpan di local storage sebagai akun yang terdaftar di frontend
      saveLocalUser(payload);

      try {
        await api.post("/user-management/users/sign-up", payload);
      } catch (err) {
        console.warn("Sign up API fail/fallback to local storage:", err);
      }

      // Arahkan ke halaman login
      navigate("/login", {
        state: { registered: true, username: values.username },
      });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: isDark
          ? "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #2a081a 100%)"
          : "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
        padding: { xs: 2, sm: 3 },
        transition: "background 0.3s ease",
      }}
    >
      <Button
        onClick={toggleTheme}
        variant="outlined"
        size="small"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          borderRadius: "20px",
          borderColor: isDark ? "#555" : "#f48fb1",
          color: isDark ? "#fff" : "#c2185b",
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
          boxShadow: isDark
            ? "0 4px 12px rgba(0,0,0,0.4)"
            : "0 4px 12px rgba(194,24,91,0.15)",
          "&:hover": {
            borderColor: "#c2185b",
            backgroundColor: isDark ? "rgba(255,255,255,0.18)" : "#fce4ec",
          },
        }}
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </Button>

      <AppCard sx={{ maxWidth: 480 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            color: isDark ? "#f48fb1" : "#c2185b",
            mb: 0.5,
            fontSize: { xs: "26px", sm: "32px" },
          }}
        >
          Buat Akun
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: isDark ? "#aaaaaa" : "#757575",
            mb: 3.5,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Daftar sekarang untuk mulai memesan makanan favoritmu
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2}>
            <AppTextField
              label="Username"
              name="username"
              placeholder="Contoh: user123"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <AppTextField
              label="Nama Lengkap"
              name="fullName"
              placeholder="Contoh: Budi Santoso"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <AppTextField
              label="Email"
              type="email"
              name="email"
              placeholder="contoh@domain.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <AppTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Minimal 6 karakter"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: isDark ? "#bbb" : "#757575" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AppTextField
              label="Konfirmasi Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Ulangi password anda"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: isDark ? "#bbb" : "#757575" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AppButton type="submit" sx={{ mt: 1 }}>
              Daftar Akun
            </AppButton>

            <Typography
              variant="body2"
              align="center"
              sx={{
                color: isDark ? "#aaaaaa" : "#757575",
                mt: 1.5,
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Sudah punya akun?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{
                  color: isDark ? "#f48fb1" : "#c2185b",
                  fontWeight: 700,
                }}
              >
                Masuk di sini
              </Link>
            </Typography>
          </Stack>
        </Box>
      </AppCard>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}