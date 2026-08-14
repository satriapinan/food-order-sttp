import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useParams, useSearchParams } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // React Router hooks untuk menangkap parameter URL dan query string
    const { value } = useParams();
    const [searchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Login Berhasil!\nUsername/Email: ${email}`);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 50%, #ad1457 100%)",
                padding: 3,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: { xs: 4, sm: 5 },
                    width: "100%",
                    maxWidth: 440,
                    borderRadius: "24px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 12px 40px rgba(173, 20, 87, 0.25)",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: "bold", color: "#c2185b", mb: 0.5 }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    sx={{ color: "#757575", mb: 4 }}
                >
                    Sign in to your account 
                    {value ? ` - ${value}` : ""} 
                    {searchParams.get("id") ? ` (ID: ${searchParams.get("id")})` : ""}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Username atau Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                title={showPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
                                            >
                                                {showPassword ? "👁️" : "👁️‍🗨️"}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#c2185b",
                                paddingY: 1.4,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: "12px",
                                "&:hover": { backgroundColor: "#ad1457" },
                            }}
                        >
                            Sign In
                        </Button>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ color: "#757575", mt: 1 }}
                        >
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                underline="hover"
                                sx={{
                                    color: "#c2185b",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Sign up here
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}