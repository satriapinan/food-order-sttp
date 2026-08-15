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
  Button, 
  InputAdornment, 
  IconButton, 
  Link 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function LoginPages() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  //  Inisialisasi Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Data siap dikirim:", values);
      
      navigate("/food-order"); 
    },
  });

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flex: 1,
        p: 2 
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", padding: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ fontWeight: "bold", textAlign: "center", color: "#1976d2" }}
          >
            Welcome Back !
          </Typography>

          {/*  form dan panggil handleSubmit Formik */}
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
            
            {/* Input Password */}
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, borderRadius: 2 }}>
              LOGIN
            </Button>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Belum punya akun?{" "}
              <Link 
                href="#" 
                underline="hover" 
                onClick={handleRegisterClick} 
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
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