import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { authApi, getApiErrorMessage } from "../services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const res = await authApi.login({
          username: values.username.trim(),
          password: values.password,
        });
        login(res.data);
        navigate("/food-order");
      } catch (err) {
        alert(getApiErrorMessage(err, "Login gagal."));
      } finally {
        setIsSubmitting(false);
      }
    },
  });
   

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0, md: 5 },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 72px)",
        px: { xs: 2, md: 6 },
        py: { xs: 3, md: 6 },
        backgroundColor: isDark ? "#121212" : "#fff8f0",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          width: { md: 420, lg: 520 },
          minHeight: 520,
          borderRadius: 4,
          overflow: "hidden",
          backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 18px 45px rgba(92, 52, 20, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 4,
            color: "white",
            background: "linear-gradient(transparent 35%, rgba(30, 18, 10, 0.82))",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
            Makan enak,
            <br />
            lebih mudah.
          </Typography>
          <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.88)" }}>
            Pesan makanan favoritmu dalam beberapa langkah.
          </Typography>
        </Box>
      </Box>

      <AppCard sx={{ maxWidth: 400, backgroundColor: isDark ? "#1e1e1e" : "#fff", color: isDark ? "#fff" : "#000" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDark ? "#bbb" : "#888", marginBottom: "24px" }}
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
            sx={{
              marginBottom: "16px",
              "& .MuiInputBase-input": { color: isDark ? "#fff" : "#000" },
              "& .MuiInputLabel-root": { color: isDark ? "#bbb" : undefined },
              "& .MuiOutlinedInput-root fieldset": { borderColor: isDark ? "#666" : undefined },
            }}
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
            sx={{
              marginBottom: "16px",
              "& .MuiInputBase-input": { color: isDark ? "#fff" : "#000" },
              "& .MuiInputLabel-root": { color: isDark ? "#bbb" : undefined },
              "& .MuiOutlinedInput-root fieldset": { borderColor: isDark ? "#666" : undefined },
            }}
          />

          <Button
            type="submit"
            onClick={formik.submitForm}
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ minHeight: 48, borderRadius: "5px", boxShadow: "none" }}
          >
            {isSubmitting ? "Memproses..." : "Login"}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "16px" }}
        >
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: isDark ? "#90caf9" : "#1976d2" }}>
            Register
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default LoginPage;
