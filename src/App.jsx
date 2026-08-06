import { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        {!isLoggedIn ? (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Masukkan email dan password untuk masuk.
            </Typography>

            <Box component="form" onSubmit={handleLogin} noValidate>
              <Stack spacing={2}>
                <TextField label="Email" variant="outlined" fullWidth />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Stack>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4">dashboard</Typography>
            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </Paper>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;