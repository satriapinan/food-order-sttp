import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

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

const loginSchema = Yup.object({
  username: Yup.string().required("Username/Email wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const muiTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: { main: "#5a8e94" },
    },
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({ username: values.username });
      navigate("/menu");
    },
  });

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: isDark ? "#0f172a" : "#fafafa",
      color: isDark ? "#f3f4f6" : "#111827",
    },
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: isDark ? "#0f172a" : "#f4f7f8", p: 2 }}>
        <Container maxWidth="sm" sx={{ backgroundColor: isDark ? "#111827" : "#fff", borderRadius: "24px", p: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body2" sx={{ color: isDark ? "#cbd5e1" : "text.secondary", mb: 4 }}>Sign in to continue</Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              name="username"
              placeholder="Username or Email"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: "primary.main" }} />}
                label={<Typography variant="body2" sx={{ color: isDark ? "#cbd5e1" : "text.secondary" }}>Remember me</Typography>}
              />
              <MuiLink component={Link} to="/forgot-password" sx={{ color: "primary.main", fontWeight: "bold", textDecoration: "none" }}>Forgot password?</MuiLink>
            </Box>

            <Button fullWidth type="submit" variant="contained" disabled={!formik.isValid || !formik.dirty} sx={{ py: 1.5, borderRadius: "12px", textTransform: "none", fontWeight: "bold" }}>
              Sign In
            </Button>

            <Typography variant="body2" sx={{ mt: 3, color: isDark ? "#cbd5e1" : "text.secondary" }}>
              Don&apos;t have an account? <MuiLink component={Link} to="/register" sx={{ color: "primary.main", fontWeight: "bold", textDecoration: "none" }}>Create one</MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}