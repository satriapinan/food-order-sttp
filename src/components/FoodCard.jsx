import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AppButton from "./AppButton"; 

function FoodCard({ item }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300&auto=format&fit=crop"
        alt={item.name}
      />
      
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Box 
          sx={{ 
            backgroundColor: "#E4F0F6", color: "#548394", display: "inline-block", 
            padding: "4px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "bold", mb: 1 
          }}
        >
          {item.category}
        </Box>
        
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {item.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#548394", fontWeight: "bold", mb: 2 }}>
          {item.price}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <StarBorderIcon fontSize="small" sx={{ color: "#BDBDBD" }} />
          <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>
            Available
          </Typography>
        </Box>

        <AppButton onClick={() => alert(`${item.name} dimasukkan ke keranjang!`)}>
          Add to Cart
        </AppButton>
      </CardContent>
    </Card>
  );
}

export default FoodCard;