import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack, Link, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { authApi, getApiErrorMessage } from "../services/api";
import * as Yup from "yup";
import { useFormik } from "formik";

const registerSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  fullName: Yup.string().required("Full Name wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .required("Confirm Password wajib diisi"),
});

export default function Register() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const navigate = useNavigate();
  const [show, setShow] = useState({ pass: false, confirm: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const registrationData = { ...values };
        delete registrationData.confirmPassword;
        await authApi.register({
          ...registrationData,
          fullname: registrationData.fullName,
          retypePassword: values.confirmPassword,
        });
        alert("Registrasi berhasil. Silakan login.");
        navigate("/login");
      } catch (err) {
        alert(getApiErrorMessage(err, "Registrasi gagal."));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Paper elevation={4} sx={{ width: "100%", maxWidth: 440, p: { xs: 4, sm: 5 }, borderRadius: 3, bgcolor: isDark ? "#0f172a" : "#fff", color: isDark ? "#e2e8f0" : "#0f172a" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: isDark ? "#7dd3fc" : "#0369a1", mb: 0.5 }}>
          Create Account
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: isDark ? "#cbd5e1" : "#757575", mb: 4 }}>
          Sign up to get started
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={2.5}>
            <TextField 
              label="Username" 
              name="username"
              fullWidth 
              sx={inputStyle(isDark)}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField 
              label="Full Name" 
              name="fullName"
              fullWidth 
              sx={inputStyle(isDark)}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField 
              label="Password" 
              name="password"
              type={show.pass ? "text" : "password"} 
              fullWidth 
              sx={inputStyle(isDark)} 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShow({ ...show, pass: !show.pass })} edge="end" size="small" sx={{ color: isDark ? "#cbd5e1" : "#475569" }}>{show.pass ? "👁️" : "👁️‍🗨️"}</IconButton></InputAdornment> }} 
            />
            <TextField 
              label="Confirm Password" 
              name="confirmPassword"
              type={show.confirm ? "text" : "password"} 
              fullWidth 
              sx={inputStyle(isDark)} 
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShow({ ...show, confirm: !show.confirm })} edge="end" size="small" sx={{ color: isDark ? "#cbd5e1" : "#475569" }}>{show.confirm ? "👁️" : "👁️‍🗨️"}</IconButton></InputAdornment> }} 
            />

            <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} sx={{ backgroundColor: isDark ? "#38bdf8" : "#0369a1", color: isDark ? "#082f49" : "#fff", py: 1.4, borderRadius: 2, fontWeight: "bold", "&:hover": { backgroundColor: isDark ? "#7dd3fc" : "#075985" } }}>
              {isSubmitting ? "Mendaftarkan..." : "Sign Up"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" align="center" sx={{ color: isDark ? "#cbd5e1" : "#757575", mt: 2 }}>
          Already have an account? <Link component={RouterLink} to="/login" underline="hover" sx={{ color: isDark ? "#7dd3fc" : "#0369a1", fontWeight: "bold" }}>Sign in here</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

const inputStyle = (isDark) => ({
  "& .MuiInputBase-input": { color: isDark ? "#f8fafc" : "#0f172a" },
  "& .MuiInputLabel-root": { color: isDark ? "#cbd5e1" : "#475569" },
  "& .MuiOutlinedInput-root": {
    backgroundColor: isDark ? "#111827" : "#fff",
    "& fieldset": { borderColor: isDark ? "#475569" : "#cbd5e1" },
    "&:hover fieldset": { borderColor: isDark ? "#7dd3fc" : "#0369a1" },
    "&.Mui-focused fieldset": { borderColor: isDark ? "#7dd3fc" : "#0369a1" },
  },
});