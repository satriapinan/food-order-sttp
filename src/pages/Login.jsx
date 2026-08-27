import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";

const loginSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

function Login() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoginError("");
        const res = await api.post(
          "/user-management/users/sign-in",
          values
        );
        login(res.data);
        navigate("/menu");
      } catch (err) {
        setLoginError(err.response?.data?.message || "Login Gagal");
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
        backgroundColor: isDark ? "#121212" : "#F7F6FC",
        backgroundImage: isDark
          ? "radial-gradient(circle at 20% 15%, rgba(109,91,208,0.10), transparent 40%)"
          : "radial-gradient(circle at 20% 15%, rgba(109,91,208,0.08), transparent 40%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 380,
          padding: { xs: 3.5, sm: 5 },
          borderRadius: "20px",
          textAlign: "center",
          backgroundColor: isDark ? "#1E1E1E" : "#fff",
          color: isDark ? "#fff" : "#1A1A1A",
          border: isDark ? "1px solid #2E2E2E" : "1px solid #ECE9F7",
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.45)"
            : "0 4px 14px rgba(31,20,80,0.05), 0 24px 48px rgba(31,20,80,0.08)",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            backgroundColor: "#6D5BD0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 20px rgba(109,91,208,0.35)",
          }}
        >
          <RestaurantIcon sx={{ color: "#fff", fontSize: 26 }} />
        </Box>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.3px" }}>
          Selamat Datang
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDark ? "#9B96B0" : "#8B87A3", marginTop: 0.5, marginBottom: 4 }}
        >
          Masuk untuk melanjutkan pesananmu
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}
        >
          <AppTextField
            name="username"
            label="Username"
            placeholder="Masukkan username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            name="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {loginError && (
            <Typography variant="body2" sx={{ color: "#E85D5D", fontWeight: 500 }}>
              {loginError}
            </Typography>
          )}

          <AppButton type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Memproses..." : "Masuk"}
          </AppButton>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3.5, color: isDark ? "#9B96B0" : "#8B87A3" }}>
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#6D5BD0", fontWeight: 700, textDecoration: "none" }}>
            Daftar di sini
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;