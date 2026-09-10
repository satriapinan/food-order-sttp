import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useTheme } from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";

// IMPORT API
import api from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("Nama pengguna wajib diisi"),
  fullname: Yup.string().required("Nama lengkap wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi kata sandi harus sama")
    .required("Konfirmasi kata sandi wajib diisi"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // ✅ PATH DAN FIELD YANG BENAR (sesuai Swagger)
        const response = await api.post("/user-management/users/sign-up", {
          username: values.username,
          fullname: values.fullname,
          password: values.password,
          retypePassword: values.retypePassword,
        });

        console.log("Response register:", response.data);

        alert("Yeay! Akun berhasil dibuat. Silakan login.");
        navigate("/login");
      } catch (error) {
        console.error("Gagal mendaftar:", error);

        const errorData = error.response?.data;
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          (errorData
            ? JSON.stringify(errorData)
            : error.message || "Gagal mendaftar! Periksa server kamu.");
        alert("Pesan dari server: " + errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // ===== END ADORNMENT (FITUR MATA) =====
  const passwordEndAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
        aria-label={
          showPassword ? "Sembunyikan password" : "Tampilkan password"
        }
        sx={{ color: isDark ? "#a4b0be" : "inherit" }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  const confirmPasswordEndAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
        aria-label={
          showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"
        }
        sx={{ color: isDark ? "#a4b0be" : "inherit" }}
      >
        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "radial-gradient(ellipse at top, #1e1e24 0%, #121212 100%)"
          : "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        color: isDark ? "#f5f6fa" : "#2d3436",
        p: 2,
        position: "relative",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Tombol Dark Mode */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <Tooltip title={isDark ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}>
          <Button
            onClick={toggleTheme}
            size="small"
            startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
            sx={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.85)",
              color: isDark ? "#feca57" : "#ff7e5f",
              textTransform: "none",
              px: 2,
              py: 0.8,
              borderRadius: "12px",
              fontWeight: "700",
              boxShadow: isDark
                ? "0 4px 15px rgba(0,0,0,0.4)"
                : "0 4px 15px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid",
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.5)",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.15)"
                  : "#ffffff",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {isDark ? "Light" : "Dark"}
          </Button>
        </Tooltip>
      </Box>

      <Box
        sx={{
          maxWidth: 450,
          width: "100%",
          p: { xs: 4, sm: 5 },
          borderRadius: "24px",
          boxShadow: isDark
            ? "0 20px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 126, 95, 0.15)"
            : "0 15px 35px rgba(255, 126, 95, 0.5), inset 0 0 10px rgba(255,255,255,0.5)",
          bgcolor: isDark
            ? "rgba(30, 30, 36, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "#ff7e5f",
            width: 64,
            height: 64,
            boxShadow: "0 0 20px rgba(255, 126, 95, 0.8)",
            mb: 2,
          }}
        >
          <RestaurantIcon fontSize="large" />
        </Avatar>

        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "900",
            textAlign: "center",
            mb: 0.5,
            background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Food Margi
        </Typography>

        <Typography
          variant="body2"
          mb={4}
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            textAlign: "center",
            color: isDark ? "#a4b0be" : "text.secondary",
          }}
        >
          Buat akun baru untuk mulai memesan
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <AppTextField
            name="username"
            label="Nama Pengguna"
            placeholder="Ketik username kamu"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            name="fullname"
            label="Nama Lengkap"
            placeholder="Ketik nama lengkap kamu"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />

          {/* ✅ PASSWORD — pakai endAdornment (sesuai AppTextField) */}
          <AppTextField
            name="password"
            label="Kata Sandi"
            placeholder="Ketik kata sandi"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            endAdornment={passwordEndAdornment}
          />

          {/* ✅ CONFIRM PASSWORD — pakai endAdornment */}
          <AppTextField
            name="retypePassword"
            label="Konfirmasi Kata Sandi"
            placeholder="Ketik ulang kata sandi"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.retypePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.retypePassword &&
              Boolean(formik.errors.retypePassword)
            }
            helperText={
              formik.touched.retypePassword && formik.errors.retypePassword
            }
            endAdornment={confirmPasswordEndAdornment}
          />

          <Box sx={{ mt: 2, mb: 3 }}>
            <AppButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Mendaftar...
                </Box>
              ) : (
                "Daftar"
              )}
            </AppButton>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontWeight: "500",
            color: isDark ? "#ced6e0" : "inherit",
          }}
        >
          Sudah punya akun?{" "}
          <Box
            component="span"
            sx={{
              color: isDark ? "#feb47b" : "#e65c00",
              fontWeight: "900",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                textShadow: "0 0 8px rgba(255, 126, 95, 0.6)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Masuk di sini
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
