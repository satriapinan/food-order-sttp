import { Card, Container, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FoodCard from '../components/FoodCard';
import foodImage from '../assets/food.jpg';
import { useFormik } from "formik";

const kategori = [
  { label: 'Makanan' },
  { label: 'Minuman' },
];

const shortby = [
  { label: 'Harga' },
  { label: 'Kategori' },
];

function MenuPage() {

    const formik = useFormik({
        initialValues: {
            search: "",
            kategori: "",
            sortby: "",
        },
        onSubmit: (values) => {
            console.log("Filter values:", values);
        },
    });

    return(
        <Box
        sx={{
        backgroundColor: 'primary.main',
        minHeight: '100vh',
        paddingTop: 2,
        }}
        >
        <Container>
            <Card sx={{ maxWidth: 500, margin: 'auto', padding: 1 , }}>
                <Typography variant="h6" component="div" align='center' color='primary'>
                    Food Menu
                </Typography>
                <Typography variant="subtitle1" align='center'>
                    Discover Delicious Meal Just For You
                </Typography>
                <TextField
                sx={{ width: 480,}}
                label="Search Food...."
                id="outlined-size-small"
                size="small"
                margin="normal"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
                />
                <Stack direction="row" spacing={2}>
                <TextField
                id="outlined-select-currency-native"
                id="select-kategori"
                label="Kategori"
                select
                size="small"
                name="kategori"
                value={formik.values.kategori}
                onChange={formik.handleChange}
                slotProps={{
                select: {
                  native: true,
                },
                }}
                >
                <option value="" disabled></option>
                {kategori.map((option) => (
                <option key={option.label} value={option.label}>
                    {option.label}
                </option>
                ))}
                </TextField>
                <TextField
                id="outlined-select-currency-native"
                id="select-sortby" 
                label="ShortBy"
                select
                size="small"
                name="sortby"
                value={formik.values.sortby}
                onChange={formik.handleChange}
                slotProps={{
                select: {
                  native: true,
                },
                }}
                >
                <option value="" disabled></option>
                {shortby.map((option) => (
                <option key={option.label} value={option.label}>
                    {option.label}
                </option>
                ))}
                </TextField>
                </Stack>
            </Card>
            <Box sx={{ maxWidth: 500, margin: 'auto', padding: 1 , }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
              <FoodCard
                image={foodImage}
                category="Indonesian Food"
                name="Nasi Goreng"
                price="25.000"
                available={true}
              />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
            <FoodCard
                image={foodImage}
                category="Western Food"
                name="croissant"
                price="40.000"
                available={true}
            />
          </Grid>
          </Box>
        </Container>
        </Box>
    )
}
export default MenuPage