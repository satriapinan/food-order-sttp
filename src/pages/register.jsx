import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Link 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// IMPORT KOMPONEN TOMBOL 
import AppButton from "../components/AppButton"; 

function RegisterPages() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  // Fungsi untuk kembali ke halaman login
  const toLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "linear-gradient(135deg, #3776F5 0%, #3070EF 100%)", 
        padding: 2
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%", padding: 3, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ fontWeight: "bold", textAlign: "center", color: "#3D66EC", mb: 1 }}
          >
            Create Account
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
          >
            Gabung sama kami
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            <TextField label="Username" variant="outlined" fullWidth size="small" />
            
            <TextField label="Full Name" variant="outlined" fullWidth size="small" />
            
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
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

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              size="small"
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
            
            {/* KOMPONEN TOMBOLNYA */}
            <AppButton>
              Create Account
            </AppButton>
            
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Already have an account?{" "}
              <Link 
                href="#" 
                underline="hover" 
                onClick={toLogin} 
                sx={{ fontWeight: "bold", color: "#2142E3", cursor: "pointer" }}
              >
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