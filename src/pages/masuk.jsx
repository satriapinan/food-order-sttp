import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../hooks/useAuth';
import { useTheme } from "../hooks/useThemes";
import AppTextField from '../components/AppTextField';
import api from '../services/api';
import AppButton from "../components/AppButton";
import AppSnackbar from "../components/AppSnackbar";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const masukSchema = Yup.object({
  email:Yup.string()
  .email("Format email tidak valid")
  .required("Email harus diisi"),
  password: Yup.string()
  .min(6, "Password minimal 6 karakter")
  .required("Password harus diisi"),
});

export default function MasukPage() {
    const navigate = useNavigate();

    const { masuk } = useAuth();
    const { mode } = useTheme();
    const isDark = mode === "dark";
    
    const [notification, setNotification] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    const handleCloseNotification = () => {
      setNotification((prev) => ({...prev, open: false}));
    };

    const formik = useFormik({
      initialValues:{
        email:"tiara@gmail.com",
        password:"taf12345",
      },
      validationSchema:masukSchema,
      onSubmit: async (values) =>{
        try {
          const payload = {
            username: values.email,
            email: values.email,
            password: values.password,
          };
          const res = await api.post("/user-management/users/sign-in", payload);
          const userData = res.data?.data || res.data;

          if (masuk) {
            masuk(userData);
          }

          setNotification({
            open:true,
            message:'Login berhasil!',
            severity:"success",
          });

          setTimeout(() => {
            navigate("/beranda");
          }, 1500);

        } catch (err) {
          const errorMessage =
          err.response?.data?.message ||
          "Login gagal! Periksa email dan password Anda.";
          setNotification({
            open:true,
            message:errorMessage,
            severity:"error",
          });
        }
      },
  });

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)"
          : "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={isDark ? 0 : 6}
          sx={{
            p: 4,
            borderRadius: 4,
            background: isDark
              ? "linear-gradient(145deg, #1e1e2e, #252535)"
              : "#fff",
            border: isDark ? "1px solid rgba(48,232,245,0.2)" : "none",
            boxShadow: isDark
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(6,182,212,0.15)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #30e8f5, #06b6d4)",
                mb: 2,
                boxShadow: "0 4px 20px rgba(6,182,212,0.4)",
              }}
            >
              <RestaurantMenuIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

        <Typography 
        variant="h4"
              sx={{
                fontWeight: "bold",
                color: isDark ? "#e0e0e0" : "#1a1a2e",
                mb: 0.5,
              }}
            >
          Masuk
        </Typography>
        <Typography
              variant="body2"
              sx={{ color: isDark ? "#9e9e9e" : "#666" }}
            >
              Selamat datang kembali!
            </Typography>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>

            <AppTextField
            label="Email"
            type='email'
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>

            <AppTextField
            label="Password"
            type='password'
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>

            <AppButton
              type="submit"
              sx={{
                mt: 1,
                background: "linear-gradient(135deg, #30e8f5, #06b6d4)",
                color: "#062630",
                fontWeight: "bold",
                fontSize: "15px",
                py: 1.2,
                "&:hover": {
                  background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                },
              }}
            >
              {formik.isSubmitting ? "Memproses..." : "Masuk"}
            </AppButton>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 2.5 }}>
            <Typography
              variant="body2"
              sx={{ color: isDark ? "#9e9e9e" : "#666" }}
            >
              Belum punya akun?{" "}
              <Link
                to="/register"
                style={{
                  color: isDark ? "#30e8f5" : "#06b6d4",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Daftar sekarang
              </Link>
            </Typography>
          </Box>
      </Paper>
    </Container>
    <AppSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}/>
    </Box>
  );
};