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
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";

const registerSchema = Yup.object({
  username: Yup.string().required("Nama pengguna wajib diisi"),
  fullName: Yup.string().required("Nama lengkap wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi kata sandi harus sama")
    .required("Konfirmasi kata sandi wajib diisi"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert("Yeay! Akun berhasil dibuat. Silakan login.");
        navigate("/login");
      } catch (error) {
        console.error("Gagal mendaftar:", error);
      } finally {
        setIsLoading(false);
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
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 450,
          width: "100%",
          p: { xs: 4, sm: 5 },
          borderRadius: "24px",
          boxShadow:
            "0 15px 35px rgba(255, 126, 95, 0.5), inset 0 0 10px rgba(255,255,255,0.5)",
          bgcolor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          color="#e65c00"
          mb={0.5}
          sx={{ fontWeight: "900", textAlign: "center" }}
        >
          Food Margi
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={4}
          sx={{ fontSize: "15px", fontWeight: "500", textAlign: "center" }}
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
            name="fullName"
            label="Nama Lengkap"
            placeholder="Ketik nama lengkap kamu"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

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
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <AppTextField
            name="confirmPassword"
            label="Konfirmasi Kata Sandi"
            placeholder="Ketik ulang kata sandi"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Box sx={{ mt: 2, mb: 3 }}>
            <AppButton
              type="submit"
              disabled={isLoading}
              onClick={formik.handleSubmit}
            >
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
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Sudah punya akun?{" "}
          <Box
            component="span"
            sx={{
              color: "#e65c00",
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
