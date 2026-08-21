import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, TextField } from "@mui/material";
import AppButton from "../AppButton.jsx";

const AppTextField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => (
  <TextField
    fullWidth
    variant="outlined"
    margin="normal"
    label={label}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
  />
);

const useAuth = () => {
  return {
    login: (data) => console.log("Simulasi proses login dengan data:", data),
  };
};

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
      navigate("/menu");
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // 1. Warna Background saya ubah jadi gradasi oranye
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "white",
          mx: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          // 2. Warna Judul "Login" saya ubah jadi oranye
          color="#ff7e5f"
          mb={1}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="textSecondary"
          mb={3}
        >
          Masuk ke akun kamu
        </Typography>

        <form onSubmit={formik.handleSubmit}>
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

          <Box sx={{ mt: 3, mb: 2 }}>
            <AppButton type="submit" onClick={formik.handleSubmit}>
              Login
            </AppButton>
          </Box>
        </form>

        <Typography variant="body2" textAlign="center" mt={2}>
          Belum punya akun?{" "}
          <Box
            component="span"
            // 3. Warna teks link "Daftar di sini" saya ubah jadi oranye
            sx={{ color: "#ff7e5f", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Daftar di sini
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
