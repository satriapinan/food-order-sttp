import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Box, Card, CardContent, Typography, InputAdornment, 
  IconButton, Link, FormControl, InputLabel, OutlinedInput, FormHelperText 
} from "@mui/material";

// Menggunakan Komponen Reusable & Hook
import AppButton from "../components/AppButton"; 
import AppTextField from "../components/AppTextField"; 
import { useAuth } from "../hooks/useAuth"; 
import api from "../services/api";

// Validasi Formik
const loginSchema = Yup.object({
  username: Yup.string().required("Username tidak boleh kosong!"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi!"),
});

function LoginPages() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post("/user-management/users/sign-in", values);
        
        const userData = {
          token: response.data.token,
          ...response.data.user
        };
        
        login(userData);
        navigate("/menu"); 
        
      } catch (error) {
        console.error("Gagal login:", error);
        alert(error.response?.data?.message || "Terjadi kesalahan koneksi!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", p: 2 }}>
      <Card sx={{ maxWidth: 400, width: "100%", padding: 2, borderRadius: 4, boxShadow: "0 10px 30px rgba(224, 93, 54, 0.15)" }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "900", textAlign: "center", color: "#E05D36" }}>
            Welcome Back! 🍔
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
            Siap untuk memesan makanan favoritmu?
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            {/* Menggunakan AppTextField yang sangat ringkas! */}
            <AppTextField formik={formik} name="username" label="Username" />
            
            {/* Password  */}
            <FormControl 
              fullWidth 
              variant="outlined" 
              size="small"
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#E05D36" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#E05D36" },
              }}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Password" 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? "🙈" : "👁️"}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            
            {/* Saat isLoading true, tombol dinonaktifka */}
            <AppButton type="submit" disabled={isLoading}>
              {isLoading ? "Memproses..." : "LOGIN"}
            </AppButton>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Belum punya akun?{" "}
              <Link href="#" underline="hover" onClick={(e) => { e.preventDefault(); navigate("/register"); }} sx={{ fontWeight: "bold", color: "#E05D36" }}>
                Daftar di sini
              </Link>
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPages;