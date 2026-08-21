import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

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
        backgroundColor: "var(--page-bg)",
        color: "var(--text-primary)",
        transition: "background-color 0.3s ease, color 0.3s ease",
        padding: 2,
      }}
    >
      <AppCard>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: 400,
            },
            padding: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Food Order
          </Typography>

          <Typography
            variant="h6"
            textAlign="center"
            gutterBottom
          >
            Masuk ke akun Food Order kamu
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Silakan masukkan email dan password kamu
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <AppTextField
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email &&
                Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email &&
                formik.errors.email
              }
            />

            <AppTextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password &&
                formik.errors.password
              }
            />

            <Box sx={{ mt: 3 }}>
              <AppButton type="submit">
                Login
              </AppButton>
            </Box>
          </form>

          <Box
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">
              Belum punya akun?
            </Typography>

            <AppButton
              type="button"
              onClick={() => navigate("/register")}
            >
              Daftar Sekarang
            </AppButton>
          </Box>
        </Box>
      </AppCard>
    </Box>
  );
}

export default LoginPage;