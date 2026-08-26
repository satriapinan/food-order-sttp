import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppButton from "../components/AppButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api";

// Buat Skema Validasi dengan Yup (Disesuaikan dengan gambar)
const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullname: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Konfigurasi Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/user-management/users/sign-up", values);

        alert("Register berhasil! Silakan login.");

        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        alert(err.response?.data?.message || "Register gagal");
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
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            padding: 4,
          }}
        >
          {/* Bagian Judul */}
          <Box sx={{ textAlign: "center", marginBottom: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#8b0000" }}
            >
              Buat Akun
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginTop: 0.5 }}
            >
              Gabung hari ini dan mulai sekarang
            </Typography>
          </Box>

          {/* Bungkus input dengan tag <form> */}
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Input Username */}
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            {/* Input Full Name */}
            <TextField
              label="Full Name"
              name="fullname" // Diubah menjadi fullname
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
            />

            {/* Input Password */}
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Input Confirm Password */}
            <TextField
              label="Confirm Password"
              name="retypePassword"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.retypePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.retypePassword &&
                Boolean(formik.errors.retypePassword)
              }
              helperText={
                formik.touched.retypePassword && formik.errors.retypePassword
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <AppButton type="submit" fullWidth>
              Buat Akun
            </AppButton>
          </form>

          {/* Link kembali ke Login */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 1, color: "text.secondary" }}
          >
            Sudah Punya Akun?{" "}
            <Link
              href="/login"
              underline="hover"
              sx={{ fontWeight: "bold", color: "#b22222" }}
            >
              Masuk Di Sini
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPage;
