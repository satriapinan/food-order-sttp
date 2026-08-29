import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import AppSnackbar from "../components/AppSnackbar";
import api from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullname: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();

  // State untuk Notifikasi Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/user-management/users/sign-up", values);
        setSnackbar({
          open: true,
          message: "Register berhasil! Silakan login.",
          severity: "success",
        });
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Register gagal",
          severity: "error",
        });
      }
    },
  });

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

          <form onSubmit={formik.handleSubmit}>
            <AppInput
              label="Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username && Boolean(formik.errors.username)
              }
              helperText={formik.touched.username && formik.errors.username}
            />

            <AppInput
              label="Nama Lengkap"
              type="text"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fullname && Boolean(formik.errors.fullname)
              }
              helperText={formik.touched.fullname && formik.errors.fullname}
            />

            <AppInput
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={formik.touched.password && formik.errors.password}
            />

            <AppInput
              label="Konfirmasi Password"
              type="password"
              name="retypePassword"
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
            />

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit" fullWidth>
                DAFTAR
              </AppButton>
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
          </form>
        </Paper>
      </Box>

      {/* Snackbar Reusable */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default RegisterPage;