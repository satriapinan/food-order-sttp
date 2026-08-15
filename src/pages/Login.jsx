import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

function LoginPage() {
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f7f8", // Light background for contrast
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: "#777", mb: 3 }}>
            Silakan masuk ke akun Anda
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox sx={{ color: "#5a8e94", "&.Mui-checked": { color: "#5a8e94" } }} />}
              label={<Typography variant="body2" sx={{ color: "#555" }}>Ingat saya</Typography>}
              sx={{ mt: 1, mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                marginTop: 1,
                backgroundColor: "#5a8e94",
                "&:hover": {
                  backgroundColor: "#4a777c",
                },
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              Masuk
            </Button>
          </Box>

          <Typography variant="body2" sx={{ marginTop: 3, color: "#666" }}>
            Belum punya akun?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{ color: "#5a8e94", textDecoration: "none", fontWeight: "bold" }}
            >
              Daftar di sini
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;