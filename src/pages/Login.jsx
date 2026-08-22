import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";
import AppSnackbar, { useSnackbar } from "../components/AppSnackbar";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

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
        // Gunakan ini untuk sekarang
        alert(err.response?.data?.message || "Login gagal");
        // Ini contoh penggunaan custom snackbar
        showSnackbar(err.response?.data?.message || "Login gagal", "error");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <AppCard>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#888", marginBottom: "24px" }}
        >
          Masuk ke akun Food Order kamu
        </Typography>


        <form onSubmit={formik.handleSubmit}>
          <AppTextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <AppButton type="submit">Login</AppButton>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "16px" }}
        >
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>
            Register
          </Link>
        </Typography>
      </AppCard>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default LoginPage;
