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
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSnackbar } from "../hooks/useSnackbar";
import api from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullname: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password harus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  const formik = useFormik({
    initialValues: { username: "", fullname: "", password: "", retypePassword: "" },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/user-management/users/sign-up", values);
        showSnackbar("Register berhasil! Silakan login.", "success");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        showSnackbar(err.response?.data?.message || "Register gagal", "error");
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
            maxWidth: "420px",
            borderRadius: "24px",
            p: { xs: 4, sm: 5 },
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#2B7A78",
              textAlign: "center",
              letterSpacing: 1.5,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Create Account
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "center", color: "#A0AEC0", mb: 3 }}>
            Join us today and get started
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              placeholder="Username"
              size="small"
              margin="dense"
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
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              size="small"
              margin="dense"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
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
              margin="dense"
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

            <TextField
              fullWidth
              id="retypePassword"
              name="retypePassword"
              type="password"
              placeholder="Retype Password"
              size="small"
              margin="dense"
              value={formik.values.retypePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
              helperText={formik.touched.retypePassword && formik.errors.retypePassword}
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
              Register
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#718096" }}>
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/login")}
                sx={{ color: "#2B7A78", fontWeight: "bold", textDecoration: "none" }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
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