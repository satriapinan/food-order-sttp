import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  InputAdornment
} from "@mui/material";
import AppLayout from "../components/AppLayout";
import FoodCard from "../components/FoodCard";

const foodItems = [
  { id: 1, title: 'Nasi Goreng', price: 'Rp 25.000', category: 'Indonesian', image: '/img/menu1.jpg' },
  { id: 2, title: 'Mie Ayam', price: 'Rp 20.000', category: 'Indonesian', image: '/img/menu2.jpg' },
  { id: 3, title: 'Ayam Bakar', price: 'Rp 35.000', category: 'Western', image: '/img/menu3.jpg' },
  { id: 4, title: 'Gado-Gado', price: 'Rp 18.000', category: 'Asian', image: '/img/menu4.jpg' },
  { id: 5, title: 'Es Krim Vanilla', price: 'Rp 15.000', category: 'Desserts', image: '/img/menu5.jpg' },
  { id: 6, title: 'Kapalo Maco', price: 'Rp 15.000', category: 'Desserts', image: '/img/coba1.png' }
];

function DashboardPage() {
  return (
    <AppLayout>
      <Container maxWidth="lg">
        {/* Header Paper */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 5,
            textAlign: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            Food Menu
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Discover delicious meals just for you
          </Typography>

          <TextField
            fullWidth
            placeholder="Search for food..."
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: '1.2rem', paddingBottom: '2px' }}>🔍</span>
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="flex-start"
          >
            <FormControl sx={{ minWidth: 150, flexGrow: { xs: 1, sm: 0 } }}>
              <InputLabel id="category-label">Kategori</InputLabel>
              <Select labelId="category-label" label="Kategori" defaultValue="">
                <MenuItem value=""><em>Semua</em></MenuItem>
                <MenuItem value="indonesian">Indonesian</MenuItem>
                <MenuItem value="western">Western</MenuItem>
                <MenuItem value="asian">Asian</MenuItem>
                <MenuItem value="desserts">Desserts</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, flexGrow: { xs: 1, sm: 0 } }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select labelId="sort-label" label="Sort By" defaultValue="">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="price_asc">Termurah</MenuItem>
                <MenuItem value="price_desc">Termahal</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Grid of Foods */}
        <Grid container spacing={3}>
          {foodItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <FoodCard
                title={item.title}
                price={item.price}
                category={item.category}
                image={item.image}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AppLayout>
  );
}

export default DashboardPage;
