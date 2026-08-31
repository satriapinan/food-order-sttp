import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Stack } from "@mui/material";

import AppButton from "../AppButton";
import AppTextField from "../AppTextField";
import AppCard from "../AppCard";
import { useAuth } from "../../assets/hooks/useAuth";

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
      login({
        email: values.email,
      });

      navigate("/food-order");
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top left, rgba(122, 180, 168, 0.30), transparent 30%), linear-gradient(135deg, #f5f7fa 0%, #edf5f3 100%)",
        color: "var(--text-primary)",
        transition: "background-color 0.3s ease, color 0.3s ease",
        padding: 2,
      }}
    >
      <AppCard
        sx={{
          width: "100%",
          maxWidth: 1080,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          minHeight: { xs: "auto", md: 670 },
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: { xs: 3, md: 5 },
            background: "linear-gradient(135deg, rgba(45,143,168,0.12), rgba(127,178,165,0.18)), #f8fafb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 3, px: 1.5, py: 0.8, borderRadius: "999px", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(45,143,168,0.15)" }}>
              <Box component="span" sx={{ fontSize: 18 }}>🍽️</Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.12, color: "#2d8fa8" }}>
                RASAKITA
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 2, color: "var(--text-primary)" }}>
              Nikmati hidangan favoritmu tanpa ribet.
            </Typography>

            <Typography variant="body1" sx={{ color: "var(--text-secondary)", maxWidth: 480, lineHeight: 1.7 }}>
              Temukan makanan dan minuman pilihan, pesan dengan cepat, dan nikmati pengalaman makan yang lebih nyaman dari rumah.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {[
              { label: "Delivery", value: "15-25 min" },
              { label: "Top Picks", value: "4.8/5" },
              { label: "Fresh", value: "100%" },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(45,143,168,0.12)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Typography variant="caption" sx={{ color: "var(--text-secondary)", letterSpacing: 0.08, textTransform: "uppercase", fontWeight: 700 }}>
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 800, color: "var(--text-primary)" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 3, md: 5 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Typography variant="caption" sx={{ display: "inline-block", fontWeight: 800, letterSpacing: 0.1, textTransform: "uppercase", color: "#2d8fa8", mb: 1 }}>
              Selamat datang
            </Typography>

            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, color: "var(--text-primary)" }}>
              Masuk ke akun
            </Typography>

            <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 3 }}>
              Silakan masukkan email dan password kamu untuk melanjutkan.
            </Typography>

            <form onSubmit={formik.handleSubmit} noValidate>
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

              <Box sx={{ mt: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ color: "var(--text-secondary)" }}>
                  Lupa password?
                </Typography>
              </Box>

              <AppButton type="submit" fullWidth>
                Login
              </AppButton>
            </form>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--text-secondary)", mb: 1.5 }}>
                Belum punya akun?
              </Typography>

              <AppButton
                type="button"
                variant="outlined"
                onClick={() => navigate("/register")}
                fullWidth
                sx={{
                  background: "transparent",
                  color: "#2d8fa8",
                  border: "1px solid rgba(45,143,168,0.4)",
                  "&:hover": {
                    background: "rgba(45,143,168,0.04)",
                    borderColor: "#2d8fa8",
                  },
                }}
              >
                Daftar Sekarang
              </AppButton>
            </Box>
          </Box>
        </Box>
      </AppCard>
    </Box>
  );
}

export default LoginPage;