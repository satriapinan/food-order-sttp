import { Card, Container, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FoodCard from '../components/FoodCard';
import foodImage from '../assets/food.jpg';
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const SORT_OPTIONS = [
    { value: "", label: "Default" },
    { value: "price,asc", label: "Harga Terendah" },
    { value: "price,desc", label: "Harga Tertinggi" },
    { value: "name,asc", label: "Nama A-Z" },
]

function MenuPage() {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: { search: "", category: "", sortBy: "" },
        onSubmit: () => {},
    });

    const { search, category, sortBy } = formik.values;

    useEffect(() => {
        api.get("/food-order/categories").then((res) => {
            setCategories(res.data.data || []);
        });
    }, []);

    useEffect(() => {
        const params = { pageSize: 100 };

        if (search) params.foodName = search;
        if (category) params.categoryId = category;
        if (sortBy) params.sortBy = sortBy;

        api.get("/food-order/foods", { params }).then((res) => {
            setFoods(res.data.data || []);
        });
    }, [search, category, sortBy]);

    const categoryOptions = useMemo(() => {
        return [
            { value: "", label: "Semua" },
            ...categories.map((c) => ({
                value: String(c.id),
                label: c.categoryName,
            })),
        ];
    }, [categories]);

    return(
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
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
                size="small"
                margin="normal"
                />
                <Stack direction="row" spacing={2}>
                <TextField
                label="Kategori"
                name="category"
                select
                size="small"
                value={formik.values.category}
                onChange={formik.handleChange}
                slotProps={{
                select: { native: true },
                inputLabel: { shrink: true },
                }}
                >
                {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
                </TextField>
                <TextField
                label="Sort By"
                name="sortBy"
                select
                size="small"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
                slotProps={{
                select: { native: true },
                inputLabel: { shrink: true },
                }}
                >
                {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
                </TextField>
        </Stack>
            </Card>
            <Box sx={{ maxWidth: 500, margin: 'auto', padding: 1 , }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {foods.map((food) => (
                <FoodCard
                image={foodImage}
                key={food.id}
                foodId={food.id}
                category={food.categories?.categoryName}
                name={food.name}
                price={food.price?.toLocaleString('id-ID')}
                available={true}
              />
                ))}
          </Grid>
          </Box>
        </Container>
    )
}
export default MenuPage