import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../Components/AppButton";
import AppTextField from "../Components/AppTextField";
import AppCard from "../Components/AppCard";
import api from "../Services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullname: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/user-management/users/sign-up", values);
        alert("Register berhasil! Silakan login.");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        alert(err.response?.data?.message || "Register gagal");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <AppCard 
        sx={{ 
          maxWidth: 420, 
          width: "100%", 
          p: { xs: 2, sm: 4 },
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          bgcolor: "background.paper"
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "3rem", mb: 1, lineHeight: 1 }}>🍔</Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "800", color: "text.primary" }}
          >
            Buat Akun Baru
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mt: 1 }}
          >
            Bergabunglah dengan Food Order sekarang!
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <AppTextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ mb: 2 }}
          />

          <AppTextField
            label="Nama Lengkap"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
            sx={{ mb: 2 }}
          />

          <AppTextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 2 }}
          />

          <AppTextField
            label="Konfirmasi Password"
            type="password"
            name="retypePassword"
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
            sx={{ mb: 3 }}
          />

          <AppButton 
            type="submit" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Daftar Sekarang
          </AppButton>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "24px", color: "text.secondary" }}
        >
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
            Login di sini
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default RegisterPage;