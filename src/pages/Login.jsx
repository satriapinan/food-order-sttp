import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/user-management/users/sign-in", {
        username,
        password,
      });
      login({ ...data.user, token: data.token });
      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Login gagal. Pastikan server backend sedang berjalan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--page-bg)",
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--surface)",
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "var(--text-strong)", mb: 1 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--text-muted)", mb: 3 }}>
            Silakan masuk ke akun Anda
          </Typography>

          {successMessage && (
            <Typography role="status" variant="body2" sx={{ width: "100%", color: "#3d7c52", backgroundColor: "#e8f5eb", borderRadius: 1, px: 1.5, py: 1, mb: 1 }}>
              {successMessage}
            </Typography>
          )}
          {error && (
            <Typography role="alert" variant="body2" sx={{ width: "100%", color: "#b83232", backgroundColor: "#fff0f0", borderRadius: 1, px: 1.5, py: 1, mb: 1 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Username / Email"
              autoComplete="username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "var(--control-bg)",
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "var(--control-bg)",
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox sx={{ color: "var(--accent)", "&.Mui-checked": { color: "var(--accent)" } }} />}
              label={<Typography variant="body2" sx={{ color: "var(--text-muted)" }}>Ingat saya</Typography>}
              sx={{ mt: 1, mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                marginTop: 1,
                backgroundColor: "var(--accent)",
                "&:hover": {
                  backgroundColor: "var(--accent-dark)",
                },
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ marginTop: 3, color: "var(--text-muted)" }}>
            Belum punya akun?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{ color: "var(--accent)", textDecoration: "none", fontWeight: "bold" }}
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