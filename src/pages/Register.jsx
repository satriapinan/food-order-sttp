import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "../hooks/useTheme";
import { Box, Button, Container, IconButton, InputAdornment, Link as MuiLink, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#888" }}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#888" }}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const registerSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  fullName: Yup.string().required("Nama Lengkap wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const muiTheme = createTheme({
    palette: { mode: isDark ? "dark" : "light", primary: { main: "#5a8e94" } },
  });

  const formik = useFormik({
    initialValues: { username: "", fullName: "", password: "", confirmPassword: "" },
    validationSchema: registerSchema,
    onSubmit: () => {
      navigate("/login");
    },
  });

  const textFieldStyles = { mb: 2, "& .MuiOutlinedInput-root": { borderRadius: "12px", backgroundColor: isDark ? "#0f172a" : "#fafafa", color: isDark ? "#f3f4f6" : "#111827" } };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isDark ? "#0f172a" : "#f4f7f8", p: 2 }}>
        <Container maxWidth="sm" sx={{ backgroundColor: isDark ? "#111827" : "#fff", borderRadius: "24px", p: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}>Create Account</Typography>
          <Typography variant="body2" sx={{ color: isDark ? "#cbd5e1" : "text.secondary", mb: 4 }}>Join us today and get started</Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
            <TextField fullWidth name="username" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username} sx={textFieldStyles} />
            <TextField fullWidth name="fullName" placeholder="Full Name" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.fullName && Boolean(formik.errors.fullName)} helperText={formik.touched.fullName && formik.errors.fullName} sx={textFieldStyles} />
            <TextField fullWidth name="password" placeholder="Password" type={showPassword ? "text" : "password"} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} sx={textFieldStyles} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</IconButton></InputAdornment>) }} />
            <TextField fullWidth name="confirmPassword" placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} sx={textFieldStyles} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">{showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}</IconButton></InputAdornment>) }} />

            <Button fullWidth type="submit" variant="contained" disabled={!formik.isValid || !formik.dirty} sx={{ py: 1.5, mt: 2, borderRadius: "12px", textTransform: "none", fontWeight: "bold" }}>Create Account</Button>
            <Typography variant="body2" sx={{ mt: 3, color: isDark ? "#cbd5e1" : "text.secondary" }}>Already have an account? <MuiLink component={Link} to="/login" sx={{ color: "primary.main", fontWeight: "bold", textDecoration: "none" }}>Sign in here</MuiLink></Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}