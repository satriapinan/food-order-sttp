import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login Berhasil! Welcome back, ${username}`);
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
            maxWidth: "850px",
            minHeight: "480px",
            borderRadius: "24px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <Grid container sx={{ flex: 1 }}>
            {/* SISI KIRI: BANNER GRADIENT */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
                color: "white",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                p: 5,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                Welcome to 
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, fontSize: "0.95rem" }}>
                STTP Food Order Application Kelola pemesanan makanan kamu dengan cepat dan efisien
              </Typography>
            </Grid>

            {/* SISI KANAN: FORM LOGIN */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 4, sm: 5 },
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "320px" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: "#764ba2",
                    textAlign: "center",
                    letterSpacing: 2,
                    mb: 3,
                    textTransform: "uppercase",
                  }}
                >
                  User Login
                </Typography>

                <form onSubmit={handleLogin}>
                  {/* USERNAME */}
                  <TextField
                    fullWidth
                    placeholder="Username"
                    variant="outlined"
                    margin="normal"
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

                  {/* PASSWORD */}
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    margin="normal"
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

                  {/* REMEMBER ME & FORGOT PASSWORD */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      my: 1.5,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{ color: "#764ba2", "&.Mui-checked": { color: "#764ba2" } }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "#718096" }}>Remember</Typography>}
                    />
                    <Link href="#" variant="caption" underline="hover" sx={{ color: "#a0aec0" }}>
                      Forgot password?
                    </Link>
                  </Box>

                  {/* TOMBOL LOGIN */}
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
                      Login
                    </Button>
                  </Box>

                  {/* NAVIGASI KE REGISTER */}
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", mt: 3, color: "#718096", fontSize: "0.85rem" }}
                  >
                    Don't have an account?{" "}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => navigate("/register")}
                      sx={{
                        color: "#764ba2",
                        fontWeight: "bold",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}