import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../hooks/useAuth';
import AppTextField from '../components/AppTextField';

const registerScehema = Yup.object({
  name: Yup.string()
  .required("Nama harus diisi"),
  email: Yup.string()
  .email("Format email tidak valid")
  .required("Email harus diisi"),
  password: Yup.string()
  .min(6, "Password minimal 6 karakter")
  .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

export default function RegisterPage() {
    const show = true;
    const [ count, setCount] = useState(0);
    const navigate = useNavigate();

    const tologin = () => {
        navigate("/login");
    }

    const{ register }= useAuth();

    const formik = useFormik({
      initialValues:{
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
      },
      validationSchema:registerScehema,
      onSubmit:async (values) =>{
        await register(values.name, values.email, values.email, values.confirmPassword);
        navigate("/food-order");

      }
      });

    if (show)
  return(
    
    <Container maxWidth="xs" sx={{ mt: 8, backgroundColor: '#30e8f5', p:5, borderRadius: 8}}>
      {/*kotak isi from*/}

      <Paper elevation={3} sx={{ p: 4, textAlign: "center"}}>
        <Typography 
        variant='h3' sx={{ mb:1, fontWeight:"bold" }}>
            <Link to="/masuk"></Link>
          Masuk
        </Typography>
        <Typography>
          <from onSubmit={formik.handleSubmit}>
            <AppTextField
            label="Nama Lengkap"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}/>
            
            <AppTextField
            label="Email"
            type='email'
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>

            <AppTextField
            label="Password"
            type='password'
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>

            <AppTextField
            label="ConfirmPassword"
            type='confirmPassword'
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}/>

          </from>
        </Typography>
        <Button
        onClick={tologin}
        style={count < 5 ? StyleSheet.Button : StyleSheet.buttonB}
        onClick ={() => setCount ()}
          fullWidth variant="contained" 
          sx={{ mt:2,
            backgroundColor:"#30e8f5",
            fontSize: '20px',
            fontWeight:"bold",
            '&:hover':{
              backgroundColor:"rgb(17, 16, 20)",
            }
          }}>
            <NavLink to="/masuk">
            Masuk
            </NavLink>
        </Button>
        {/*tombol masuk*/}
      </Paper>
    </Container>
  );
};