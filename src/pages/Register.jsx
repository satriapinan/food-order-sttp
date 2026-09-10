import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import AppTextField from "../components/AppTextField";
import AppSnackbar from "../components/AppSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import { registerUser } from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username minimal 3 karakter")
    .required("Username harus diisi"),
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data = await registerUser({
          username: values.username,
          fullname: values.fullName,
          password: values.password,
          retypePassword: values.confirmPassword,
        });

        showSnackbar(
          data.message || "Registrasi berhasil! Silakan login.",
          "success",
        );

        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        showSnackbar(
          error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat registrasi",
          "error",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <AppCard
        sx={{
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: 3, fontWeight: 700 }}
        >
          Daftar Akun
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <AppTextField
            id="username"
            name="username"
            label="Username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <AppTextField
            id="fullName"
            name="fullName"
            label="Nama Lengkap"
            margin="normal"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <AppTextField
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <AppTextField
            id="confirmPassword"
            name="confirmPassword"
            label="Konfirmasi Password"
            type="password"
            margin="normal"
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

          <Box sx={{ marginTop: 3 }}>
            <AppButton
              type="submit"
              disabled={formik.isSubmitting}
              sx={{ width: "100%", py: 1.2 }}
            >
              {formik.isSubmitting ? "Mendaftarkan..." : "Daftar"}
            </AppButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3 }}>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#6D5BD0",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>
        </Typography>
      </AppCard>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default RegisterPage;
