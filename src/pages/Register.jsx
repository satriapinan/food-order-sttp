import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useTheme } from '../hooks/useTheme';
import api from '../services/api';
import AppButton from '../components/AppButton';
import AppTextField from '../components/AppTextField';

const registerSchema = Yup.object({
  username: Yup.string().required('Username harus diisi'),
  fullname: Yup.string().required('Nama lengkap harus diisi'),
  password: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password harus diisi'),
  retypePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password tidak sama')
    .required('Konfirmasi password harus diisi'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const [message, setMessage] = useState({ text: "", type: "" });

  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      password: '',
      retypePassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setMessage({ text: "", type: "" });
        await api.post('/user-management/users/sign-up', values);
        setMessage({ text: "Register berhasil! Mengarahkan ke login...", type: "success" });
        setTimeout(() => navigate('/login'), 1500);
      } catch (err) {
        setMessage({
          text: err.response?.data?.message || "Register gagal",
          type: "error",
        });
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? "#121212" : "#F7F6FC",
        backgroundImage: isDark
          ? "radial-gradient(circle at 20% 15%, rgba(109,91,208,0.10), transparent 40%)"
          : "radial-gradient(circle at 20% 15%, rgba(109,91,208,0.08), transparent 40%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 380,
          padding: { xs: 3.5, sm: 5 },
          borderRadius: "20px",
          textAlign: "center",
          backgroundColor: isDark ? "#1E1E1E" : "#fff",
          color: isDark ? "#fff" : "#1A1A1A",
          border: isDark ? "1px solid #2E2E2E" : "1px solid #ECE9F7",
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.45)"
            : "0 4px 14px rgba(31,20,80,0.05), 0 24px 48px rgba(31,20,80,0.08)",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            backgroundColor: "#6D5BD0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 20px rgba(109,91,208,0.35)",
          }}
        >
          <RestaurantIcon sx={{ color: "#fff", fontSize: 26 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.3px", marginBottom: 3 }}>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: "left" }}
        >
          <AppTextField
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            name="fullname"
            label="Nama Lengkap"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />

          <AppTextField
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <AppTextField
            name="retypePassword"
            label="Confirm Password"
            type="password"
            value={formik.values.retypePassword}
            onChange={formik.handleChange}
            error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
            helperText={formik.touched.retypePassword && formik.errors.retypePassword}
          />

          {message.text && (
            <Typography
              variant="body2"
              sx={{
                color: message.type === "error" ? "#E85D5D" : "#3FB673",
                fontWeight: 500,
              }}
            >
              {message.text}
            </Typography>
          )}

          <AppButton type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Memproses..." : "Daftar Sekarang"}
          </AppButton>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3.5, color: isDark ? "#9B96B0" : "#8B87A3" }}>
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#6D5BD0", fontWeight: 700, textDecoration: "none" }}>
            Login di sini
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;