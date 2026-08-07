import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function App() {
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
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 1,
              padding: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #b22222, #8b0000)",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(to right, #8b0000, #5c0000)",
                boxShadow: "none",
              },
            }}
          >
            Masuk
          </Button>

          {/* Link Sign Up */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2, color: "text.secondary" }}
          >
            Belum punya akun?
            <Link
              href="#"
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

export default App;
