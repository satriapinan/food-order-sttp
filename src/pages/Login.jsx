import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";
import { useAuth } from "../hooks/useAuth";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({ email: values.email });
      navigate("/food-order");
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
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
    </Box>
  );
}

export default LoginPage;
