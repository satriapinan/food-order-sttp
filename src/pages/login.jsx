import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

// Skema Validasi Yup untuk Login
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const login = auth?.login || (() => {});
  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({ email: values.email });
      navigate("/food-menu");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #2a081a 100%)"
          : "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
        padding: { xs: 2, sm: 3 },
        transition: "background 0.3s ease",
      }}
    >
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
    </Box>
  );
}