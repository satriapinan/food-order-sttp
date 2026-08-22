import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from '../hooks/useAuth';
import AppTextField from '../components/AppTextField';
import api from '../services/api';

const masukSchema = Yup.object({
  email:Yup.string()
  .email("Format email tidak valid")
  .required("Email harus diisi"),
  password: Yup.string()
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

    const { masuk } = useAuth();
    
    const [notification, setNotification] = useState({
      open:false,
      message:'',
      severity:'success',
    });

    const handleCloseNotification = () => {
      setNotification((prev) => ({...prev, open: false}));
    };

    const formik = useFormik({
      initialValues:{
        email:"tiara@gmail.com",
        password:"taf12345",
      },
      validationSchema:masukSchema,
      onSubmit: async (values) =>{
        try {
          await api.post("/user-management/users/sign-in", values);
          if (masuk){
            await masuk(values.email, values.password);
          }

          setNotification({
            open:true,
            message:'Login berhasil!',
            severity:"success",
          });

          setTimeout(() => {
            navigate("/food-order");
          }, 1500);

        } catch(err){
          const errorMessage = err.response?.data?.message || "Login gagal! Periksa email dan password Anda.";
          setNotification({
            open:true,
            message:errorMessage,
            severity:"error",
          });
        }
      }
    });

    if (!show) return null;
  return(
    
    <Container maxWidth="xs" sx={{ mt: 8, backgroundColor: '#30e8f5', p:5, borderRadius: 8}}>
      {/*kotak isi from*/}

      <Paper elevation={3} sx={{ p: 4, textAlign: "center"}}>
        <Typography 
        variant='h3' sx={{ fontWeight:"bold", marginBottom:"8px" }}>
            <Link to="/masuk"></Link>
          Masuk
        </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>

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

          </Box>
        <Button
        type='submit'
        onClick={tologin}
        style={count < 5 ? StyleSheet.Button : StyleSheet.buttonB}
        onClick={() => setCount(count + 1)}
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
      <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={handleCloseNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posisi di atas tengah
      >
        <Alert
        onClose={handleCloseNotification}
        severity={notification.severity}
        variant='filled'
        sx={{width: '100%'}}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};