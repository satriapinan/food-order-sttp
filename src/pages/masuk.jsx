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

const masukSchema = Yup.object({
  email:Yup.string()
  .email("Format email tidak valid")
  .required("Email harus diisi"),
  passwor: Yup.string()
  .min(6, "Password minimal 6 karakter")
  .required("Password harus diisi"),
});

export default function MasukPage() {
    const show = true;
    const [ count, setCount] = useState(0);
    const navigate = useNavigate();

    const tologin = () => {
        navigate("/login");
    }

    const{ masuk }= useAuth();
    
    const formik = useFormik({
      initialValues:{
        emaill:"tiara@gmail.com",
        password:"taf12345",
      },
      validationSchema:masukSchema,
      onSubmit: async (values) =>{
        await masuk(values.email, values.password);
        navigate("/food-order");
      }
    })
    if (show)
  return(
    
    <Container maxWidth="xs" sx={{ mt: 8, backgroundColor: '#30e8f5', p:5, borderRadius: 8}}>
      {/*kotak isi from*/}

      <Paper elevation={3} sx={{ p: 4, textAlign: "center"}}>
        <Typography 
        variant='h3' sx={{ fontWeight:"bold", marginBottom:"8px" }}>
            <Link to="/masuk"></Link>
          Masuk
        </Typography>
        <Typography>
          <form onSubmit={formik.handleSubmit}>

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

          </form>
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
            <NavLink to="/beranda">
            Masuk
            </NavLink>
        </Button>
        {/*tombol masuk*/}
      </Paper>
    </Container>
  );
};