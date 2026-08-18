import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from "@mui/material";

import AppButton from "../components/AppButton"; 

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid Boss!")
    .required("Email wajib diisi!"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi!"),
});

function LoginPages() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", values.email);
      console.log("Login Berhasil, Data:", values);
      navigate("/menu"); 
    },
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", p: 2 }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
            Welcome Back!
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            
            {/* Input Email */}
            <TextField 
              label="Email" 
              name="email" 
              type="email" 
              variant="outlined" 
              fullWidth 
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            
            {/* atasi mata password*/}
            <FormControl 
              fullWidth 
              variant="outlined" 
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Password" // Harus ada label di sini agar garis kotaknya terpotong rapi
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {/* Logo Mata menggunakan Emoji Native */}
                      {showPassword ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* Menampilkan pesan error merah di bawah kotak password */}
              {formik.touched.password && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            
            <AppButton type="submit">LOGIN</AppButton>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Belum punya akun?{" "}
              <Link href="#" underline="hover" onClick={handleRegisterClick} sx={{ fontWeight: "bold", cursor: "pointer" }}>
                Register
              </Link>
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPages;