import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppButton from "../components/AppButton";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      sx={{
        // Mengubah background utama
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #8b0000, #3e0000)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
        >
          {/* Bagian Judul */}
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#8b0000" }}
            >
              Selamat Datang
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginTop: 0.5 }}
            >
              Masuk ke akun Anda
            </Typography>
          </Box>

          {/* Form Input */}
          <TextField label="Username" variant="outlined" fullWidth />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Tombol Login */}
          <AppButton fullWidth>Masuk</AppButton>

          {/* Link Sign Up */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2, color: "text.secondary" }}
          >
            Belum punya akun?
            <Link
              href="/register"
              underline="hover"
              sx={{ fontWeight: "bold", color: "#b22222" }}
            >
              Daftar di sini
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
