import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppButton from "./components/AppButton";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login Berhasil! Username: " + username);
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
          backgroundColor: "#eef2f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "90%",
            maxWidth: "900px",
            height: "500px",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={6}
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 4,
                boxSizing: "border-box",
              }}
            >
              <Typography variant="caption" sx={{ letterSpacing: 1.5, opacity: 0.8, mb: 1 }}>
                NICE TO SEE YOU AGAIN
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                WELCOME BACK
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: "280px" }}>
                STTP Food Order Application
              </Typography>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{
                height: "100%",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                boxSizing: "border-box",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: "320px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}>
                  Login Account
                </Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 4 }}>
                  Masukkan Username dan Password Anda
                </Typography>

                <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#444" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#444" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <AppButton type="submit">MASUK</AppButton>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}