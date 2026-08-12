import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Select, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

const images = import.meta.glob('./assets/*.{png,jpg,jpeg,svg}', {eager: true});

const foodData =[
    {id: 1, name:"Nasi Goreng", price: "25.000", category:"Indonesian Food",imgName:"nasi-goreng.jpg"},
    {id: 2, name:"Mie Ayam", price:"20.000", category:"Indonesian Food", imgName:"Mie-Ayam.png"},
    {id: 3, name:"Ayam Bakar", price:"35.000", category:"Indonesian Food"},
    {id: 4, name:"Gado-Gado", price:"18.000", category:"Asean Food"},
    {id: 5, name:"Es Krim Vanila", price:"15.000", category:"Desserts"}
];
export default function BerandaPage() {
    const show = true;
    const [ count, setCount] = useState(0);
    const navigate = useNavigate();

    const tologin = () => {
        navigate("/login");
    }
    
    if (!show) return null;
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#30e8f5', py:4}}>
            <Container maxWidth="lg">
                {/* 1. kotak pencarian*/}
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mb: 4, borderRadius:3}}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062630' }}>
                        <Link to="/masuk"></Link>
                        Food Menu
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Discover delicious meals just for you
                    </Typography>
                    <TextField fullWidth placeholder='Search for food...' size='small' sx={{ mb:2}}/>

                    <Box sx={{display: 'flex', gap:2}}>
                        <Select defaultValue="" displayEmpty size='small' sx={{ width: 150 }}>
                            <MenuItem value="">Kategori</MenuItem>
                        </Select>
                        
                        <Select defaultValue="" displayEmpty size='small' sx={{ width: 150 }}>
                            <MenuItem value="">Sort By</MenuItem>
                        </Select>
                    </Box>
                </Paper>
                {/* 2. daftar makanan */}
                <Grid container spacing={3}>
                    {foodData.map((food) => {
                        const imageSrc = images[`../assets/${food.imgName}`]?.default;
                        return(
                            <Grid item xs={12} sm={6} md={3} key={food.id}>
                                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                    <CardMedia 
                                        component="img" 
                                        image={imageSrc}
                                        alt={food.name}
                                        height="160" 
                                        sx={{
                                            borderRadius: '12px 12px 0 0',
                                            objectFit: 'cover',
                                            width: '100%',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                cursor: 'pointer'
                                            }
                                        }}
                                    />
                                <CardContent>
                                    <Chip label={food.category} size="small" sx={{ backgroundColor: '#d9f1f7', color: '#0245aa', mb: 1, FontSize: '10px' }} />
                                    <Typography variant="h6" sx={{ FontSize: '16px', fontWeight:'bold'}}>
                                        {food.name}
                                    </Typography>
                                    <Typography variant='body1' sx={{color: '#0754ac', fontWeight:'bold', my:1}}>
                                        {food.price}
                                    </Typography>
                                    <Button
                                        onClick={tologin}
                                        style={count <5 ? StyleSheet.Button :StyleSheet.ButtonB}
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
                                        <NavLink to="/pesan"></NavLink>
                                    Pesan
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}