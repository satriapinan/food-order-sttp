import { Card, CardMedia, CardContent, Box, Chip, Typography } from "@mui/material";
import AppButton from "./AppButton";

function AppCard({ title, price, category, image, rating = "⭐" }) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Box sx={{ mb: 1.5 }}>
          <Chip 
            label={category} 
            size="small" 
            sx={{ 
              backgroundColor: '#fff7ed', // Very light orange
              color: '#c2410c', // Darker orange
              fontWeight: 'bold', 
              fontSize: '0.7rem',
              height: '24px'
            }} 
          />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1e293b' }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
          {price}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            {rating} 4.8
          </Typography>
          <Typography variant="caption" color="success.main" fontWeight="bold">
            Available
          </Typography>
        </Box>
        
        <AppButton variant="contained" fullWidth>
          Add to Cart
        </AppButton>
      </CardContent>
    </Card>
  );
}

export default AppCard;