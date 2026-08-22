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
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"; // Cukup gunakan import Grid standar
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useAuth } from "../hooks/useAuth";
import { useSnackbar } from "../hooks/useSnackbar";
import api from "../services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        login(res.data);
        showSnackbar("Login berhasil!", "success");
        setTimeout(() => navigate("/food-order"), 1000);
      } catch (err) {
        showSnackbar(err.response?.data?.message || "Login gagal", "error");
      }
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
          backgroundColor: "#3AAFA9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* BANNER KIRI */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                background: "linear-gradient(135deg, #2B7A78 0%, #17252A 100%)",
                color: "white",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: "#DEF2F1" }}>
                Welcome Back!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                Nikmati kemudahan memesan makanan favoritmu di STTP Food Order Application.
              </Typography>
            </Grid>

            {/* FORM KANAN */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 4, sm: 5 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#2B7A78",
                  textAlign: "center",
                  letterSpacing: 1.5,
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                User Login
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  placeholder="Username"
                  size="small"
                  margin="normal"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "#3AAFA9" }} />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "12px", backgroundColor: "#F7FAFC" },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  size="small"
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#3AAFA9" }} />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "12px", backgroundColor: "#F7FAFC" },
                    },
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.2,
                    borderRadius: "12px",
                    backgroundColor: "#2B7A78",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": { backgroundColor: "#17252A" },
                  }}
                >
                  Login
                </Button>

                <Typography variant="body2" sx={{ textAlign: "center", color: "#718096" }}>
                  Don't have an account?{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate("/register")}
                    sx={{ color: "#2B7A78", fontWeight: "bold", textDecoration: "none" }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}