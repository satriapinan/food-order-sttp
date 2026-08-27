import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../Components/AppButton";
import AppTextField from "../Components/AppTextField";
import AppCard from "../Components/AppCard";
import { useAuth } from "../Hooks/useAuth";
import api from "../Services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
        navigate("/beranda");
      } catch (err) {
        alert(err.response?.data?.message || "Login gagal");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <AppCard 
        sx={{ 
          maxWidth: 420, 
          width: "100%", 
          p: { xs: 2, sm: 4 },
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          bgcolor: "background.paper"
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "3rem", mb: 1, lineHeight: 1 }}>🍔</Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "800", color: "text.primary" }}
          >
            Selamat Datang
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mt: 1 }}
          >
            Masuk ke akun Food Order kamu
          </Typography>
        </Box>


        <form onSubmit={formik.handleSubmit}>
          <AppTextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ mb: 2 }}
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
            sx={{ mb: 3 }}
          />

          <AppButton 
            type="submit" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </AppButton>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "24px", color: "text.secondary" }}
        >
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
            Register di sini
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default LoginPage;