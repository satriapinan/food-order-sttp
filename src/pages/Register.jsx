import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasi daftar sukses, arahkan kembali ke halaman Login
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4da1a9 0%, #7db9b6 100%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          mx: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="#5297a1"
            mb={1}
          >
            Register
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            color="textSecondary"
            mb={3}
          >
            Buat akun baru Anda
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#5297a1",
                py: 1.5,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#3e7982" },
              }}
            >
              Daftar
            </Button>
          </form>

          <Typography variant="body2" textAlign="center">
            Sudah punya akun?{" "}
            <Button
              variant="text"
              sx={{
                color: "#5297a1",
                textTransform: "none",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login di sini
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;