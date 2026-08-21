import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#888" }}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "#888" }}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const muiTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#5a8e94",
      },
      background: {
        default: isDark ? "#0f172a" : "#f4f7f8",
        paper: isDark ? "#111827" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f3f4f6" : "#111827",
        secondary: isDark ? "#cbd5e1" : "#6b7280",
      },
    },
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const textFieldStyles = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: isDark ? "#0f172a" : "#fafafa",
      color: isDark ? "#f3f4f6" : "#111827",
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 16px",
      color: isDark ? "#f3f4f6" : "#111827",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "#374151" : "#dfe7ee",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "#60a5fa" : "#5a8e94",
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#cbd5e1" : "#6b7280",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      setError("Username dan password harus diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    console.log("Login success:", { ...formData, rememberMe });
    navigate("/menu");
  };

  const isFormIncomplete =
    formData.username === "" || formData.password === "";

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDark ? "#0f172a" : "#f4f7f8",
          padding: 2,
          transition: "all 0.3s ease",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: isDark ? "#111827" : "#fff",
            borderRadius: "24px",
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.35)"
              : "0 8px 32px rgba(0,0,0,0.05)",
            padding: { xs: 4, md: 6 },
            textAlign: "center",
            border: isDark ? "1px solid #374151" : "none",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: isDark ? "#cbd5e1" : "text.secondary", mb: 4 }}
          >
            Sign in to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username or Email"
              variant="outlined"
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", mb: 2, textAlign: "left" }}
              >
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                gap: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "primary.main",
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? "#cbd5e1" : "text.secondary" }}
                  >
                    Remember me
                  </Typography>
                }
              />

              <MuiLink
                component={Link}
                to="/forgot-password"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Forgot password?
              </MuiLink>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isFormIncomplete}
              sx={{
                mt: 1,
                mb: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #5a8e94 0%, #46797f 100%)",
                boxShadow: "0 4px 12px rgba(90, 142, 148, 0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg, #4d7d82 0%, #3d6a70 100%)",
                },
              }}
            >
              Sign In
            </Button>

            <Typography
              variant="body2"
              sx={{ color: isDark ? "#cbd5e1" : "text.secondary" }}
            >
              Don&apos;t have an account?{" "}
              <MuiLink
                component={Link}
                to="/register"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Create one
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}