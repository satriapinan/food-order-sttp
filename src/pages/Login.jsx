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
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await loginUser({
          username: values.username,
          password: values.password,
        });

        setSnackbar({
          open: true,
          message: data.message || "Login berhasil! Mengalihkan...",
          severity: "success",
        });

        if (login) {
          login(data.user || { username: values.username }, data.token);
        }

        setTimeout(() => {
          navigate("/food-menu");
        }, 1200);
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat login",
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
          Login
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

          <Box sx={{ marginTop: 3 }}>
            <AppButton
              type="submit"
              disabled={formik.isSubmitting}
              sx={{ width: "100%", py: 1.2 }}
            >
              {formik.isSubmitting ? "Memproses..." : "Masuk"}
            </AppButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3 }}>
          Belum punya akun?{" "}
          <Link
            to="/register"
            style={{
              color: "#6D5BD0",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Daftar disini
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

export default LoginPage;
