import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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
      navigate("/dashboard");
    },
  });

  return (
    <AppLayout center={true}>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5 },
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary.main"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Masuk ke akun Food Order kamu
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                fullWidth
              />
              <AppButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 1 }}
              >
                Login
              </AppButton>
            </Stack>
          </form>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#f97316", textDecoration: "none", fontWeight: 600 }}
            >
              Sign up here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
}

export default LoginPage;