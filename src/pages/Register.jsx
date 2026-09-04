import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppButton from "../components/AppButton";
import AppSnackbar from "../components/AppSnackbar";
import { registerUser } from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username minimal 3 karakter")
    .required("Username harus diisi"),
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data = await registerUser({
          username: values.username,
          fullname: values.fullName,
          password: values.password,
          retypePassword: values.confirmPassword,
        });

        setSnackbar({
          open: true,
          message: data.message || "Registrasi berhasil! Silakan login.",
          severity: "success",
        });

        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat registrasi",
          severity: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6D5BD0, #8E7CF0)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 360,
          padding: 4,
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: 3, fontWeight: 700 }}
        >
          Daftar Akun
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Nama Lengkap"
            margin="normal"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Konfirmasi Password"
            type="password"
            margin="normal"
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
          />

          <Box sx={{ marginTop: 3 }}>
            <AppButton
              type="submit"
              disabled={formik.isSubmitting}
              sx={{ width: "100%", py: 1.2 }}
            >
              {formik.isSubmitting ? "Mendaftarkan..." : "Daftar"}
            </AppButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3 }}>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#6D5BD0",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default RegisterPage;
