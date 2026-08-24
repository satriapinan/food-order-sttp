import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Jika menggunakan useSnackbar dari custom hook (sesuai gambar), bisa gunakan kode di bawah ini:
  // const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        login(res.data);
        navigate("/food-order");
      } catch (err) {
        // Jika sudah ada useSnackbar:
        // showSnackbar(err.response?.data?.message || "Login gagal", "error");

        // Sementara menggunakan alert karena useSnackbar belum ditemukan di folder hooks
        alert(err.response?.data?.message || "Login gagal");
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 5 },
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary.main"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Masuk ke akun Food Order kamu
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              fullWidth
            />
            <AppButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 1 }}
            >
              Login
            </AppButton>
          </Stack>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#f97316", textDecoration: "none", fontWeight: 600 }}
          >
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default LoginPage;