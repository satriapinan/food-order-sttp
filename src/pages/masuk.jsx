import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useState } from 'react';


export default function MasukPage() {
    const show = true;
    const [ count, setCount] = useState(0);
    const navigate = useNavigate();

    const tologin = () => {
        navigate("/login");
    }
    
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
        {/*tulisan masuk*/}
        <TextField fullWidth margin="normal" label="Username/Email"/>
        <TextField fullWidth margin='normal' label="Password" type='password'/>
        {/*kotak pengisian user name dan password*/}
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