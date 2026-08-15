import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppButton from "../components/AppButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6D5BD0, #8E7CF0)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ width: "100%", maxWidth: 360, padding: 4, borderRadius: "16px", textAlign: "center" }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ marginTop: 3 }}>
            <AppButton type="submit">Masuk</AppButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 3 }}>
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;