import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppLayout from "../components/AppLayout";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Nama minimal 3 karakter")
    .required("Nama harus diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // Di sini biasanya ada logika untuk menyimpan user baru ke database atau localStorage
      alert(`Akun berhasil dibuat untuk ${values.name}`);
      navigate("/login");
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Daftar akun baru Food Order
            </Typography>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Username"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
                fullWidth
              />
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? "🙈" : "👁"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
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
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? "🙈" : "👁"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <AppButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 1 }}
              >
                Register
              </AppButton>
            </Stack>
          </form>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#f97316", textDecoration: "none", fontWeight: 600 }}
            >
              Sign in here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
}

export default Register;
