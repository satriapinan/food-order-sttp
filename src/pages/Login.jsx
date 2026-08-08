import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppButton from '../components/AppButton';
import {NavLink } from 'react-router-dom';


function LoginPage() {
    // const navigate = useNavigate();
    // const toExample = () => {
    //     navigate("/example")
    // };
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
          type="Password"
          autoComplete="current-password"
        />
        <AppButton>Sign in</AppButton>
        </Stack>
        <Typography variant="subtitle1" align='center'>
        don't have an account?
      </Typography>
      <NavLink to="/register">
      <Typography variant="subtitle1" align='center' color='primary'>
        Sign up Here
      </Typography>
      </NavLink>
      {/* <Stack>
      <button onClick={toExample} variant="outlined"
        >Pindah Halaman</button>
        <Link to="/example">
        <button onClick={toExample} variant="outlined"
        >Pindah Halaman Menggunakan Link</button>
        </Link>
        <NavLink to="/example">Pindah Halaman Menggunakan NavLink</NavLink>
        </Stack> */}
      </CardContent>
    </Card>
    </Container>
    </Box>
  );
}
export default LoginPage