import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link, InputAdornment, IconButton } from "@mui/material";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.card}>
        <Typography component="h1" variant="h4" sx={styles.title}>
          Create Account
        </Typography>
        <Typography variant="body2" sx={styles.subtitle}>
          Join us today and get started
        </Typography>

        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={styles.form}>
          <TextField placeholder="Username" variant="outlined" fullWidth sx={styles.input} />
          <TextField placeholder="Full Name" variant="outlined" fullWidth sx={styles.input} />
          
          <TextField
            placeholder="Password"
            type={showPass ? "text" : "password"}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)} edge="end" sx={styles.iconButton}>
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={styles.input}
          />

          <TextField
            placeholder="Confirm Password"
            type={showConfirm ? "text" : "password"}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" sx={styles.iconButton}>
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={styles.input}
          />

          <Button type="submit" fullWidth sx={styles.button}>
            Create Account
          </Button>
        </Box>

        <Typography variant="body2" sx={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" underline="hover" sx={styles.link}>
            Sign in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f472b6 0%, #db2777 100%)",
    p: 2,
  },
  card: {
    backgroundColor: "#fff",
    p: { xs: 3, sm: 5 },
    borderRadius: "24px",
    boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "460px",
    textAlign: "center",
  },
  title: { fontWeight: 700, color: "#be185d", mb: 1, fontSize: { xs: "28px", sm: "32px" } },
  subtitle: { color: "#6b7280", mb: 4, fontSize: "14px", fontWeight: 500 },
  form: { display: "flex", flexDirection: "column", gap: 2 },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      "& fieldset": { borderColor: "#e5e7eb" },
      "&:hover fieldset": { borderColor: "#d1d5db" },
      "&.Mui-focused fieldset": { borderColor: "#db2777", borderWidth: "1.5px" },
    },
    "& .MuiInputBase-input": { p: "16px 20px", fontSize: "15px", color: "#374151" },
  },
  iconButton: {
    color: "#9ca3af",
    p: "8px",
    "&:hover": { backgroundColor: "transparent", color: "#4b5563" },
  },
  button: {
    mt: 1,
    p: 1.5,
    borderRadius: "12px",
    backgroundColor: "#be185d",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    textTransform: "none",
    boxShadow: "0px 8px 20px rgba(190, 24, 93, 0.25)",
    "&:hover": { backgroundColor: "#9d174d" },
  },
  footerText: { mt: 3.5, color: "#6b7280", fontSize: "14px", fontWeight: 500 },
  link: { color: "#be185d", fontWeight: 700 },
};