import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// 1. Simpen semua style di sini biar komponen utamanya rapi
const gaya = {
  wadahUtama: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #4b92a5 0%, #72b0a4 100%)",
    p: 2,
  },
  kartuForm: {
    bgcolor: "#fff",
    p: { xs: 4, sm: 6 },
    borderRadius: "20px",
    boxShadow: 3,
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
  },
  judul: { fontWeight: 800, color: "#457b8a", mb: 1 },
  subJudul: { fontWeight: 700, color: "#64748b", mb: 4 },
  input: {
    "& .MuiOutlinedInput-root": { borderRadius: "10px", fontWeight: "bold" },
    "& .MuiInputBase-input::placeholder": { fontWeight: "bold", opacity: 0.8 },
  },
  tombol: {
    background: "linear-gradient(to right, #4b92a5, #72b0a4)",
    borderRadius: "25px",
    py: 1.5,
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 800,
    mb: 3,
    boxShadow: "0px 4px 15px rgba(75, 146, 165, 0.4)",
    "&:hover": { background: "linear-gradient(to right, #3c7584, #5c8f85)" },
  },
  teksBawah: { fontWeight: 700, color: "#64748b" },
  link: { color: "#457b8a", fontWeight: 800 },
};

function App() {
  // State buat ngatur password mau ditampilin atau disembunyiin
  const [tampilSandi, setTampilSandi] = useState(false);

  return (
    // Background paling luar
    <Box sx={gaya.wadahUtama}>
      {/* Kotak putih buat form login-nya */}
      <Box sx={gaya.kartuForm}>
        <Typography variant="h4" sx={gaya.judul}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={gaya.subJudul}>
          Sign in to your account
        </Typography>

        {/* Area input form */}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            placeholder="Username"
            margin="normal"
            sx={gaya.input}
          />

          <TextField
            fullWidth
            placeholder="Password"
            margin="normal"
            // Kalau true jadi text biasa, kalau false jadi titik-titik (password)
            type={tampilSandi ? "text" : "password"}
            sx={{ ...gaya.input, mb: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* Tombol mata buat ngintip password */}
                  <IconButton
                    onClick={() => setTampilSandi(!tampilSandi)}
                    edge="end"
                  >
                    {tampilSandi ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Tombol submit */}
          <Button fullWidth variant="contained" sx={gaya.tombol}>
            Sign In
          </Button>

          {/* Teks daftar akun */}
          <Typography variant="body2" sx={gaya.teksBawah}>
            Don't have an account?{" "}
            <Link href="#" underline="none" sx={gaya.link}>
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
