import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// 1. Skema Validasi menggunakan Yup
const registerSchema = Yup.object({
  username: Yup.string().required("Nama pengguna wajib diisi"),
  fullName: Yup.string().required("Nama lengkap wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi kata sandi harus sama")
    .required("Konfirmasi kata sandi wajib diisi"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  // State HANYA untuk mengontrol ikon mata (show/hide password)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. Setup Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Data Pendaftaran:", values);
      // Simulasi daftar sukses, arahkan kembali ke halaman Login
      navigate("/login");
    },
  });

  // Gaya khusus agar kolom input membulat
  const inputStyle = {
    mb: 2.5,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4da1a9 0%, #7db9b6 100%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 4,
          boxShadow: 4,
          mx: 2,
          py: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="#5297a1"
            mb={1}
          >
            Buat Akun
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            color="textSecondary"
            mb={4}
          >
            Bergabunglah hari ini dan mulai
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Nama Pengguna"
              placeholder="Username"
              variant="outlined"
              sx={inputStyle}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Nama Lengkap"
              placeholder="Full Name"
              variant="outlined"
              sx={inputStyle}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Kata Sandi"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              sx={inputStyle}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Konfirmasi Kata Sandi"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              sx={inputStyle}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                mb: 3,
                backgroundColor: "#5297a1",
                py: 1.5,
                borderRadius: "10px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#3e7982" },
              }}
            >
              Buat Akun
            </Button>
          </form>

          <Typography variant="body2" textAlign="center">
            Sudah punya akun?{" "}
            <Button
              variant="text"
              sx={{
                color: "#5297a1",
                textTransform: "none",
                fontWeight: "bold",
                p: 0,
                minWidth: "auto",
              }}
              onClick={() => navigate("/login")}
            >
              Masuk di sini
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
