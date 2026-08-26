import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppSnackbar from "../components/AppSnackbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api";

const skemaMasuk = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi harus diisi"),
});

function LoginPage() {
  const [tampilkanKataSandi, setTampilkanKataSandi] = useState(false);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [notifikasi, setNotifikasi] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setTampilkanKataSandi(!tampilkanKataSandi);
  };

  const handleCloseSnackbar = () => {
    setNotifikasi({ ...notifikasi, open: false });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: skemaMasuk,
    onSubmit: async (values) => {
      setSedangMemuat(true);
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        login(res.data);
        navigate("/foodmenu");
      } catch (err) {
        setNotifikasi({
          open: true,
          message: err.response?.data?.message || "Masuk gagal",
          severity: "error",
        });
      } finally {
        setSedangMemuat(false);
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
        >
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#8b0000" }}
            >
              Selamat Datang
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginTop: 0.5 }}
            >
              Masuk ke akun Anda
            </Typography>
          </Box>

          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <AppTextField
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <AppTextField
              label="Kata Sandi"
              name="password"
              type={tampilkanKataSandi ? "text" : "password"}
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
                        {tampilkanKataSandi ? (
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

            <AppButton type="submit" fullWidth isLoading={sedangMemuat}>
              Masuk
            </AppButton>
          </form>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2, color: "text.secondary" }}
          >
            Belum punya akun?{" "}
            <Link
              href="/register"
              underline="hover"
              sx={{ fontWeight: "bold", color: "#b22222" }}
            >
              Daftar di sini
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <AppSnackbar
        open={notifikasi.open}
        message={notifikasi.message}
        severity={notifikasi.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default LoginPage;
