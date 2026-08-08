import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function LoginPages() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "#1976d2" 
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
            Welcome Back!
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            
            {/* Input Username */}
            <TextField label="Username" variant="outlined" fullWidth />
            
            {/* Input Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
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
            
            {/* Tombol Login */}
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, borderRadius: 2 }}>
              LOGIN
            </Button>
            
            {/* Teks Register */}
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