import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";

const registerSchema = Yup.object({
  name: Yup.string().required("Nama harus diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

export default function RegisterPage() {
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
    <>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "24px",
            p: { xs: 4, sm: 5 },
            textAlign: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              color: "#764ba2",
              letterSpacing: 2,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Create Account
          </Typography>

          <Typography variant="body2" sx={{ color: "#a0aec0", mb: 3 }}>
            Join us today and get started
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {/* NAME */}
            <TextField
              fullWidth
              id="name"
              name="name"
              placeholder="Full Name"
              variant="outlined"
              margin="dense"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* EMAIL */}
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              variant="outlined"
              margin="dense"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* PASSWORD */}
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              variant="outlined"
              margin="dense"
              size="small"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              variant="outlined"
              margin="dense"
              size="small"
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* TOMBOL REGISTER */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "25px",
                  px: 5,
                  py: 1,
                  background: "linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)",
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(118, 75, 162, 0.4)",
                  textTransform: "uppercase",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4A00E0 0%, #8E2DE2 100%)",
                  },
                }}
              >
                Register
              </Button>
            </Box>

            {/* NAVIGASI KE LOGIN */}
            <Typography variant="body2" sx={{ color: "#718096", fontSize: "0.85rem" }}>
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#764ba2",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </>
  );
}