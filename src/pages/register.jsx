import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";


const registerSchema = Yup.object({
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();

  
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Data Register:", values);
      alert(`Pendaftaran Berhasil!\nSelamat datang, ${values.fullName}`);
      navigate("/login");
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          marginBottom: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            borderRadius: 3,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Daftar Akun
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Buat akun baru untuk mulai memesan
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <AppInput
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <AppInput
              label="Alamat Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <AppInput
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <AppInput
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
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
            />

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit">DAFTAR</AppButton>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Masuk di sini
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterPage;