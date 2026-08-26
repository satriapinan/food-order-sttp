import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
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

// Skema Validasi Yup untuk Login
const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const login = auth?.login || (() => {});
  const theme = useTheme();
  const isDark = theme?.mode === "dark";
  const toggleTheme = theme?.toggleTheme;

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const formik = useFormik({
    initialValues: {
      username: location.state?.username || "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // 1. Coba login ke API backend terlebih dahulu
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        if (res.data) {
          login(res.data);
          navigate("/food-order");
          return;
        }
      } catch (err) {
        console.warn("Backend login fail, checking local registered users:", err);
      }

      // 2. Fallback: Cek apakah user ada di daftar registrasi lokal (local_users)
      try {
        const localUsers = JSON.parse(localStorage.getItem("local_users") || "[]");
        const foundUser = localUsers.find(
          (u) =>
            (u.username === values.username || u.email === values.username) &&
            u.password === values.password
        );

        if (foundUser) {
          login({
            id: foundUser.username || "1",
            username: foundUser.username,
            fullname: foundUser.fullName || foundUser.username,
            email: foundUser.email,
            token: "local-token-" + Date.now(),
          });
          navigate("/food-order");
          return;
        }
      } catch (e) {
        console.error(e);
      }

      // 3. Jika tidak ada di backend dan tidak ada di local storage
      setSnackbarMessage("Username atau password salah. Silakan daftar akun baru jika belum punya akun.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    },
  });

  useEffect(() => {
    if (location.state?.registered) {
      setSnackbarMessage("Registrasi berhasil! Silakan masuk menggunakan akun Anda.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  }, [location.state]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

      <AppCard>
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
          Masuk Akun
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
          Masuk ke akun Food Order kamu
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <AppTextField
              label="Username"
              type="text"
              name="username"
              placeholder="Masukkan username anda"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <AppTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan password anda"
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
                      onClick={togglePasswordVisibility}
                      edge="end"
                      sx={{ color: isDark ? "#bbb" : "#757575" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AppButton type="submit" sx={{ mt: 1 }}>
              Login
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
              Belum punya akun?{" "}
              <Link
                component={RouterLink}
                to="/register"
                underline="hover"
                sx={{
                  color: isDark ? "#f48fb1" : "#c2185b",
                  fontWeight: 700,
                }}
              >
                Daftar di sini
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