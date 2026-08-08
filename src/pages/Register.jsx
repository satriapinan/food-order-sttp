import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppButton from '../components/AppButton';
import {NavLink } from 'react-router-dom';

function RegisterPage() {
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
        Create Account
        </Typography>
        <Typography variant="subtitle1" align='center'>
        Join Us And Get Started
      </Typography>
      </div>
        <Stack spacing={2}>
         <TextField
          id="outlined-password-input"
          label="Nama kamu cuy"
          type="username"
          autoComplete="current-password"
        />
         <TextField
          id="outlined-password-input"
          label="Nama Panjang Disini"
          type="Full Name"
          autoComplete="current-password"
        />
         <TextField
          id="outlined-password-input"
          label="Password Isi broo"
          type="Password"
          autoComplete="current-password"
        />
         <TextField
          id="outlined-password-input"
          label="Confirm lagi Password luu"
          type="Confirm Password"
          autoComplete="current-password"
        />
        <AppButton>Create Account</AppButton>
        </Stack>
        <Typography variant="subtitle1" align='center'>
        Already Have Account?
      </Typography>
      <NavLink to="/login">
      <Typography variant="subtitle1" align='center' color='primary'>
        Login
      </Typography>
      </NavLink>
      </CardContent>
    </Card>
    </Container>
    </Box>
  );
}
export default RegisterPage