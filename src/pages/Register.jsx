import * as Yup from "yup";
import { Card, CardContent, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppButton2 from '../components/AppButton2';
import { NavLink, useNavigate } from 'react-router-dom';
//import { useAuth } from "../hooks/useAuth";
import { useFormik } from "formik";
import api from "../services/api";

const registerSchema = Yup.object({
  username: Yup.string().required("username harus diisi"),
  fullname: Yup.string().required("nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "passwor minimal harus 6 karakter")
    .required("passwordharus diisi"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try{
        console.log(values)
        await api.post("/user-management/users/sign-up",values);
        alert("Register telah berhasil silahkan login.");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        alert(err.response?.data?.message || "Register gagal");
        }
    },
  });

  console.log(formik.values)

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
                  label="Nama Lengkap"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
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
                <TextField
                  label="retypePassword"
                  type="password"
                  name="retypePassword"
                  value={formik.values.retypePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
                  helperText={formik.touched.retypePassword && formik.errors.retypePassword}
                />
                <AppButton2 type="submit">Create Account</AppButton2>
              </Stack>
            </form>
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