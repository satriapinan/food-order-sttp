import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Import hooks & reusable custom components
import { useAuth } from "../hooks/useAuth";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";

// Skema Validasi
const loginSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const userData = {
          token: "token-rahasia-12345",
          user: {
            id: 99,
            username: values.username,
            fullname: "Pengguna Setia",
          },
        };

        login(userData);
        navigate("/menu");
      } catch (error) {
        console.error("Gagal login:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 420,
          width: "100%",
          p: { xs: 4, sm: 5 },
          borderRadius: "24px",
          boxShadow:
            "0 15px 35px rgba(255, 126, 95, 0.5), inset 0 0 10px rgba(255,255,255,0.5)",
          bgcolor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "#ff7e5f",
            width: 64,
            height: 64,
            boxShadow: "0 0 20px rgba(255, 126, 95, 0.8)",
            mb: 2,
          }}
        >
          <RestaurantIcon fontSize="large" />
        </Avatar>
        <Typography
          component="h1"
          variant="h4"
          color="#e65c00"
          mb={0.5}
          sx={{ fontWeight: "900", textAlign: "center" }}
        >
          Food Margi
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={4}
          sx={{ fontSize: "15px", fontWeight: "500", textAlign: "center" }}
        >
          Masuk ke akun kamu untuk memesan
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <AppTextField
            label="Username"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Box sx={{ mt: 3, mb: 3 }}>
            <AppButton
              type="submit"
              disabled={isLoading}
              onClick={formik.handleSubmit}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Memproses...
                </Box>
              ) : (
                "Login"
              )}
            </AppButton>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", fontWeight: "500" }}
        >
          Belum punya akun?{" "}
          <Box
            component="span"
            sx={{
              color: "#e65c00",
              fontWeight: "900",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
                textShadow: "0 0 8px rgba(255, 126, 95, 0.6)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Daftar di sini
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
