import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function FoodCard({ image, category, name, price, rating, available, onAddToCart }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "background.paper",
        boxShadow: "0 4px 16px rgba(30, 20, 70, 0.12)",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        role="button"
        tabIndex={available ? 0 : -1}
        aria-label={`Tambah ${name} ke keranjang`}
        onClick={available ? onAddToCart : undefined}
        onKeyDown={(event) => {
          if (available && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onAddToCart?.();
          }
        }}
        sx={{ width: "100%", height: 205, objectFit: "cover", cursor: available ? "pointer" : "default", transition: "filter 0.2s ease", "&:hover": available ? { filter: "brightness(0.82)" } : {} }}
      />
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          component="span"
          sx={{
            display: "inline-block",
            px: 1.25,
            py: 0.5,
            borderRadius: 5,
            backgroundColor: "#ff9952",
            color: "#352018",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          {category}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1.5, fontWeight: 800, lineHeight: 1.2 }}>
          {name}
        </Typography>
        <Typography sx={{ color: "#ff7518", fontSize: "1.55rem", fontWeight: 800, mt: 1 }}>
          Rp {price.toLocaleString("id-ID")}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography sx={{ color: "#e5b62f", fontWeight: 700 }}>
            ★ <Typography component="span" sx={{ color: "text.primary", fontSize: "0.95rem", ml: 0.5 }}>
              {rating}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ color: available ? "text.primary" : "#a05a00", fontWeight: 500 }}>
            {available ? "Available" : "Unavailable"}
          </Typography>
        </Stack>
        <Button
          type="button"
          variant="contained"
          fullWidth
          disabled={!available}
          onClick={(event) => {
            event.preventDefault();
            onAddToCart?.();
          }}
          sx={{ mt: 2, py: 1.25, backgroundColor: "#ff7518", color: "#24150d", fontWeight: 800, borderRadius: 2, boxShadow: "none", cursor: available ? "pointer" : "not-allowed", "&:hover": { backgroundColor: "#e9630c", boxShadow: "none" } }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default FoodCard;
