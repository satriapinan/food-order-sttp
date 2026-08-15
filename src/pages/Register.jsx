import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import AppTextField from "../components/AppTextField";
import AppCard from "../components/AppCard";

const registerSchema = Yup.object({
  name: Yup.string().required("Nama harus diisi"),
  email: Yup.string().email("Format email tidak valid").required("Email harus diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
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
      console.log("Register data:", values);
      alert("Register berhasil! Silakan login.");
      navigate("/login");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <AppCard>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
          Register
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", marginBottom: "24px" }}>
          Buat akun Food Order baru
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <AppTextField
            label="Nama Lengkap"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <AppTextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          />

          <AppTextField
            label="Konfirmasi Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <AppButton type="submit">Register</AppButton>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", marginTop: "16px" }}
        >
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </AppCard>
    </Box>
  );
}

export default RegisterPage;
