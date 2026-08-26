import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  Box, Card, CardContent, Typography, InputAdornment, 
  IconButton, Link, FormControl, InputLabel, OutlinedInput, FormHelperText 
} from "@mui/material";

import AppButton from "../components/AppButton"; 
import AppTextField from "../components/AppTextField"; 
import api from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  fullname: Yup.string().required("Nama Lengkap wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password tidak cocok!") 
    .required("Konfirmasi password wajib diisi"),
});

function RegisterPages() {
  // Pisahkan state mata untuk masing-masing kotak
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRetypePassword = () => setShowRetypePassword((show) => !show);

  const formik = useFormik({
    initialValues: { username: "", fullname: "", password: "", retypePassword: "" },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Tembak API pendaftaran
        const response = await api.post("/user-management/users/sign-up", {
          username: values.username,
          fullname: values.fullname,
          password: values.password,
          retypePassword: values.retypePassword
        });
        
        console.log("Response Daftar:", response.data);
        alert("Yeay! Akun berhasil dibuat 🥳 Silakan Login dengan akun tersebut.");
        navigate("/login");
      } catch (error) {
        console.error("Gagal Register:", error.response?.data || error);
        alert(error.response?.data?.message || "Terjadi kesalahan saat mendaftar!");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
      <Card sx={{ maxWidth: 450, width: "100%", padding: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(224, 93, 54, 0.15)" }}>
        <CardContent>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "900", textAlign: "center", color: "#E05D36", mb: 1 }}>
            Daftar Akun Baru 🍕
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
            Bergabunglah dan nikmati makanan terenak!
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            <AppTextField formik={formik} name="username" label="Username" />
            <AppTextField formik={formik} name="fullname" label="Nama Lengkap" />
            
            {/* Password Utama */}
            <FormControl fullWidth variant="outlined" size="small" error={formik.touched.password && Boolean(formik.errors.password)}
              sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#E05D36" }, "& .MuiInputLabel-root.Mui-focused": { color: "#E05D36" } }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput name="password" type={showPassword ? "text" : "password"} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Password" 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? "🙈" : "👁️"}</IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password && <FormHelperText>{formik.errors.password}</FormHelperText>}
            </FormControl>

            {/* Konfirmasi Password (Dengan Mata Terpisah) */}
            <FormControl fullWidth variant="outlined" size="small" error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
              sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#E05D36" }, "& .MuiInputLabel-root.Mui-focused": { color: "#E05D36" } }}>
              <InputLabel>Konfirmasi Password</InputLabel>
              <OutlinedInput name="retypePassword" type={showRetypePassword ? "text" : "password"} value={formik.values.retypePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Konfirmasi Password" 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowRetypePassword} edge="end">{showRetypePassword ? "🙈" : "👁️"}</IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.retypePassword && formik.errors.retypePassword && <FormHelperText>{formik.errors.retypePassword}</FormHelperText>}
            </FormControl>
            
            <AppButton type="submit" disabled={isLoading}>
              {isLoading ? "Mendaftarkan..." : "DAFTAR SEKARANG"}
            </AppButton>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Sudah punya akun?{" "}
              <Link href="#" underline="hover" onClick={(e) => { e.preventDefault(); navigate("/login"); }} sx={{ fontWeight: "bold", color: "#E05D36" }}>
                Masuk di sini
              </Link>
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPages;