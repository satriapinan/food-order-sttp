import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function App() {
  return (
    <Box 
    sx={{
      backgroundColor: 'primary.main',
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
    }}
    >
    <Container maxWidth='xs'>
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
      <div>
        <Typography variant="h4" component="div" align='center' color='primary'>
        Welcome Back
        </Typography>
        <Typography variant="subtitle1" align='center'>
        Sign in to your account
      </Typography>
      </div>
        <Stack spacing={2}>
         <TextField
          id="outlined-password-input"
          label="username"
          type="username"
          autoComplete="current-password"
        />
         <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="contained">Sign in</Button>
        </Stack>
        <Typography variant="subtitle1" align='center'>
        don't have an account?
      </Typography>
      <Typography variant="subtitle1" align='center' color='primary'>
        Sign up Here
      </Typography>
      </CardContent>
    </Card>
    </Container>
    </Box>
  );
}

export default App
