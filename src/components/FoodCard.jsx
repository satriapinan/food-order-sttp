import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import api from '../services/api';

function FoodCard(props) {
    const { foodId, image, category, name, price, available } = props;
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        try {
            await api.post('/food-order/cart', { foodId });
            alert(`${name} berhasil ditambahkan ke keranjang`);
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menambahkan ke keranjang');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 200, borderRadius: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={name}
                />
            </CardActionArea>
            <CardContent>
                <Chip
                    label={category}
                    size="small"
                    color="info"
                    sx={{ marginBottom: 1 }}
                />
                <Typography variant="subtitle1" component="div" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="subtitle2" color="primary" fontWeight="bold">
                    Rp. {price}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginY: 1,
                    }}
                >
                    <IconButton size="small">
                        <StarBorderIcon fontSize="small" />
                    </IconButton>

                    <Typography variant="caption" color="text.secondary">
                        {available ? 'Available' : 'Not Available'}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? 'Menambahkan...' : 'Add to Cart'}
                </Button>
            </CardContent>
        </Card>
    );
}

export default FoodCard;