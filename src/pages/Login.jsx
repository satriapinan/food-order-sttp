import * as Yup from "yup";
import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import AppButton from '../components/AppButton';
import {NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";

const loginScema = Yup.object({
  email: Yup.string()
  .email("Format email yang anda masukkan salah")
  .required("email harus diisi"),
  password: Yup.string()
  .min(6,"password minimal 6 karakter")
  .required("password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginScema,
    onSubmit: (values) => {
      login({ email: values.email, password: values.password });
      navigate("/menu");
    },
  });

  return (
    // <Box 
    // sx={{
    //   backgroundColor: 'primary.main',
    //   display: 'flex',
    //   minHeight: '100vh',
    //   alignItems: 'center',
    // }}
    // >
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
        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
         <TextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
         <TextField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <AppButton type="submit">Sign in</AppButton>
        </Stack>
        </form>
        <Typography variant="subtitle1" align='center'>
        don't have an account?
      </Typography>
      <NavLink to="/register">
      <Typography variant="subtitle1" align='center' color='primary'>
        Sign up Here
      </Typography>
      </NavLink>
      </CardContent>
    </Card>
    </Container>
  //</Box>
  );
}
export default LoginPage