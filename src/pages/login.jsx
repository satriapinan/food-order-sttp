import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";

import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import { useAuth } from "../hooks/useAuth";


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
      login({ email: values.email });
      navigate("/menu");
    },
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
            Masuk Akun
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Silakan masukkan email dan password kamu
          </Typography>

          {/* Form dipicu oleh Formik */}
          <form onSubmit={formik.handleSubmit}>
            <AppInput
              label="Email"
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

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit">MASUK</AppButton>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Daftar di sini
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;