import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";

// 1. IMPOR IKON MATA DARI MATERIAL UI
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function App() {
  // State untuk menyimpan status: apakah password ditampilkan (true) atau disembunyikan (false)
  const [tampilSandi, setTampilSandi] = useState(false);

  // Fungsi untuk membalikkan status ikon mata saat diklik
  const handleToggleSandi = () => {
    setTampilSandi((prev) => !prev);
  };

  return (
    // Wadah Pembungkus Utama (Background Luar)
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4b92a5 0%, #72b0a4 100%)",
        padding: 2,
      }}
    >
      {/* Kotak Card Form Login */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: { xs: 4, sm: 6 },
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        {/* Judul Utama (Font Tebal) */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "800", // Menjadikan Font Sangat Tebal
            color: "#457b8a",
            mb: 1,
          }}
        >
          Welcome Back
        </Typography>

        {/* Sub-judul (Font Tebal) */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: "700", // Font Tebal
            color: "#64748b",
            mb: 4,
          }}
        >
          Sign in to your account
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          {/* Input Username (Font & Placeholder Tebal) */}
          <TextField
            fullWidth
            placeholder="Username"
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontWeight: "bold", // Teks saat diketik jadi tebal
              },
              "& .MuiInputBase-input::placeholder": {
                fontWeight: "bold", // Placeholder tebal
                opacity: 0.8,
              },
            }}
          />

          {/* Input Password + Ikon Mata */}
          <TextField
            fullWidth
            placeholder="Password"
            // Tipe diubah dinamis: jika true = 'text', jika false = 'password'
            type={tampilSandi ? "text" : "password"}
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                fontWeight: "bold", // Teks saat diketik jadi tebal
              },
              "& .MuiInputBase-input::placeholder": {
                fontWeight: "bold", // Placeholder tebal
                opacity: 0.8,
              },
              mb: 4,
            }}
            InputProps={{
              // LETAK IKON MATA ADA DI BAGIAN DI BAWAH INI
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleSandi} edge="end">
                    {/* Jika tampilSandi true munculkan mata dicoret, jika false munculkan mata biasa */}
                    {tampilSandi ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Tombol Sign In (Font Tebal) */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #4b92a5, #72b0a4)",
              borderRadius: "25px",
              padding: "12px 0",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "800", // Font Tombol Tebal
              mb: 3,
              boxShadow: "0px 4px 15px rgba(75, 146, 165, 0.4)",
              "&:hover": {
                background: "linear-gradient(to right, #3c7584, #5c8f85)",
              },
            }}
          >
            Sign In
          </Button>

          {/* Teks Bawah & Link (Font Tebal) */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: "700", // Font Tebal
              color: "#64748b",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#457b8a",
                fontWeight: "800", // Link Tebal
              }}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
