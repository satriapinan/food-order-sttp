import * as Yup from "yup";
import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppButton from '../components/AppButton';
import {NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";
import api from "../services/api";

const loginScema = Yup.object({
  username: Yup.string().required("username harus diisi"),
  password: Yup.string()
  .min(6, "passwor minimal harus 6 karakter")
  .required("passwordharus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginScema,
    onSubmit: async (values) => {
      try{
        const res = await api.post("/user-management/users/sign-in",values);
        login(res.data);
        navigate("/menu");
      } catch (err) {
        alert(err.response?.data?.message || "login gagal");
        }
    },
  });

  return (
    <Box
        sx={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
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
        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
         <TextField
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
    </Box>
  );
}
export default LoginPage