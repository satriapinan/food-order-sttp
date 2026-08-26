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
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../services/api";

const skemaDaftar = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullname: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Kata sandi minimal 6 karakter")
    .required("Kata sandi harus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Kata sandi tidak sama")
    .required("Konfirmasi kata sandi harus diisi"),
});

function RegisterPage() {
  const [tampilkanKataSandi, setTampilkanKataSandi] = useState(false);
  const [tampilkanKonfirmasiKataSandi, setTampilkanKonfirmasiKataSandi] =
    useState(false);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [notifikasi, setNotifikasi] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setTampilkanKataSandi(!tampilkanKataSandi);
  };

  const handleClickShowConfirmPassword = () => {
    setTampilkanKonfirmasiKataSandi(!tampilkanKonfirmasiKataSandi);
  };

  const handleCloseSnackbar = () => {
    setNotifikasi({ ...notifikasi, open: false });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: skemaDaftar,
    onSubmit: async (values) => {
      setSedangMemuat(true);
      try {
        await api.post("/user-management/users/sign-up", values);

        setNotifikasi({
          open: true,
          message: "Daftar berhasil! Silakan masuk.",
          severity: "success",
        });

        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        setNotifikasi({
          open: true,
          message: err.response?.data?.message || "Daftar gagal",
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

          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
              label="Nama Lengkap"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
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

            <AppTextField
              label="Konfirmasi Kata Sandi"
              name="retypePassword"
              type={tampilkanKonfirmasiKataSandi ? "text" : "password"}
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
                        {tampilkanKonfirmasiKataSandi ? (
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
              Buat Akun
            </AppButton>
          </form>

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

      <AppSnackbar
        open={notifikasi.open}
        message={notifikasi.message}
        severity={notifikasi.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default RegisterPage;
