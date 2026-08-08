import { useState } from "react";
import { Link } from "react-router-dom";
import AppButton from "../components/AppButton";
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme();

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Login dengan email ${formData.email}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Masukkan email dan password untuk masuk.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                        size="small"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? "🙈" : "👁"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <AppButton type="submit" variant="contained" fullWidth>
                Login
              </AppButton>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 600 }}>
              Sign up here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;