import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Box, Card, CardContent, Typography, TextField, 
  InputAdornment, IconButton, Link 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppButton from "../components/AppButton"; 

// Aturan Validasi Register
const registerSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  fullName: Yup.string().required("Nama Lengkap wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password tidak cocok!") 
    .required("Konfirmasi password wajib diisi"),
});

function RegisterPages() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("Data Register Berhasil:", values);
      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    },
  });

  return (
    // Backg
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
      <Card sx={{ maxWidth: 450, width: "100%", padding: 3, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", textAlign: "center", color: "#3D66EC", mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
            Gabung sama kami
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            <TextField label="Username" name="username" variant="outlined" fullWidth size="small" 
              value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            
            <TextField label="Full Name" name="fullName" variant="outlined" fullWidth size="small" 
              value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            
            <TextField label="Password" name="password" type={showPassword ? "text" : "password"} variant="outlined" fullWidth size="small"
              value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} variant="outlined" fullWidth size="small"
              value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <AppButton type="submit">Create Account</AppButton>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Already have an account?{" "}
              <Link href="#" underline="hover" onClick={(e) => { e.preventDefault(); navigate("/login"); }} sx={{ fontWeight: "bold", color: "#2142E3", cursor: "pointer" }}>
                Sign in here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPages;