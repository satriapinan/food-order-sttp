import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function App() {
  return(
    
    <Container maxWidth="xs" sx={{ mt: 8, backgroundColor: '#30e8f5', p:5, borderRadius: 8}}>
      {/*kotak isi from*/}

      <Paper elevation={3} sx={{ p: 4, textAlign: "center"}}>
        <Typography 
        variant='h3' sx={{ mb:1, fontWeight:"bold" }}>
          Masuk
        </Typography>
        {/*tulisan masuk*/}
        <TextField fullWidth margin="normal" label="Username / Email"/>
        <TextField fullWidth margin='normal' label="Password" type='password'/>
        {/*kotak pengisian user name dan password*/}
        <Button
          fullWidth variant="contained" 
          sx={{ mt:2,
            backgroundColor:"#30e8f5",
            fontSize: '20px',
            fontWeight:"bold",
            '&:hover':{
              backgroundColor:"#30e",
            }
          }}>
          Masuk
        </Button>
        {/*tombol masuk*/}
      </Paper>
    </Container>
  );
};