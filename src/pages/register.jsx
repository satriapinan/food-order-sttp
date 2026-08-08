import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan Confirm Password tidak cocok!");
      return;
    }
    alert(`Registrasi Berhasil!\nUsername: ${username}`);
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "24px",
            p: { xs: 4, sm: 5 },
            textAlign: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              color: "#764ba2",
              letterSpacing: 2,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Create Account
          </Typography>

          <Typography variant="body2" sx={{ color: "#a0aec0", mb: 3 }}>
            Join us today and get started
          </Typography>

          <form onSubmit={handleRegister}>
            {/* USERNAME */}
            <TextField
              fullWidth
              placeholder="Username"
              variant="outlined"
              margin="dense"
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* FULL NAME */}
            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              margin="dense"
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* PASSWORD */}
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
              variant="outlined"
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              fullWidth
              type="password"
              placeholder="Confirm Password"
              variant="outlined"
              margin="dense"
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#a0aec0" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#f3f4f6",
                  "& fieldset": { border: "none" },
                  px: 1,
                },
              }}
            />

            {/* TOMBOL REGISTER */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "25px",
                  px: 5,
                  py: 1,
                  background: "linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)",
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(118, 75, 162, 0.4)",
                  textTransform: "uppercase",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4A00E0 0%, #8E2DE2 100%)",
                  },
                }}
              >
                Register
              </Button>
            </Box>

            {/* NAVIGASI KE LOGIN */}
            <Typography variant="body2" sx={{ color: "#718096", fontSize: "0.85rem" }}>
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#764ba2",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </>
  );
}