import { useState } from "react";
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

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password harus sama.");
      return;
    }
    alert(`Akun berhasil dibuat untuk ${formData.name}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join us today and get started.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
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
                        onClick={handleTogglePassword}
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
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
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
                Create Account
              </AppButton>
            </Stack>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Already have an account?{' '}
            <Typography
              component="a"
              href="/login"
              sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
            >
              Sign in here
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
