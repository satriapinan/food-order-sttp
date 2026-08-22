import { useEffect, useMemo, useState } from "react";
import { Box, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "../hooks/useSnackbar";
import api from "../api";

function FoodMenu() {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            search: "",
            category: "",
            sortBy: "",
        },
    });

    const { search, category, sortBy } = formik.values;

    useEffect(() => {
        api.get("/food-order/categories").then((res) => {
            setCategories(res.data.data || []);
        });
    }, []);

    useEffect(() => {
        const params = {
            pageSize: 100,
        };

        if (search) {
            params.foodName = search;
        }

        if (category) {
            params.categoryId = category;
        }

        if (sortBy) {
            params.sortBy = sortBy;
        }

        api.get("/food-order/foods", { params }).then((res) => {
            setFoods(res.data.data || []);
        });
    }, [search, category, sortBy]);

    const categoryOptions = useMemo(() => {
        return [
            {
                value: "",
                label: "Semua",
            },
            ...categories.map((c) => ({
                value: String(c.id),
                label: c.categoryName,
            })),
        ];
    }, [categories]);

    const handleAddToCart = async (food) => {
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    label="Cari makanan"
                    name="search"
                    value={search}
                    onChange={formik.handleChange}
                />

                <Select
                    name="category"
                    value={category}
                    onChange={formik.handleChange}
                    displayEmpty
                >
                    {categoryOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                }}
            >
                <Select
                    name="sortBy"
                    value={sortBy}
                    onChange={formik.handleChange}
                    displayEmpty
                >
                    <MenuItem value="">
                        Default
                    </MenuItem>

                    <MenuItem value="priceAsc">
                        Harga Terendah
                    </MenuItem>

                    <MenuItem value="priceDesc">
                        Harga Tertinggi
                    </MenuItem>
                </Select>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 2,
                }}
            >
                {foods.map((food) => (
                    <Box key={food.id}>
                        {food.foodName}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default FoodMenu;