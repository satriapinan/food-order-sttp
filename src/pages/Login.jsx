import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import AppTextField from "../components/AppTextField";
import AppSnackbar from "../components/AppSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";
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
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

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

        showSnackbar(
          data.message || "Login berhasil! Mengalihkan...",
          "success",
        );

        if (login) {
          login(data.user || { username: values.username }, data.token);
        }

        setTimeout(() => {
          navigate("/food-menu");
        }, 1200);
      } catch (error) {
        showSnackbar(
          error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat login",
          "error",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <AppCard
        sx={{
          width: "100%",
          maxWidth: 380,
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
          <AppTextField
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

          <AppTextField
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
