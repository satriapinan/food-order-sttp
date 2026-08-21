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

// Buat Skema Validasi dengan Yup
const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username minimal 3 karakter")
    .required("Username harus diisi"),
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
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
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Data Registrasi:", values);
      alert("Akun berhasil dibuat! Silakan login.");
      navigate("/login");
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        // background: "linear-gradient(to bottom right, #8b0000, #3e0000)",
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
              name="fullName"
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
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
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
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

            {/* Tombol Register: Tambahkan type="submit" */}
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
