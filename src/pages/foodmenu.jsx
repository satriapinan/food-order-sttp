// src/pages/FoodMenu.jsx
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FoodCard from "../components/FoodCard";

// DATA DUMMY
const menuData = [
  {
    id: 1,
    title: "Nasi Goreng",
    category: "Indonesian Food",
    price: "Rp. 25.000",
    image: "/images/nasigoreng.jpg",
  },
  {
    id: 2,
    title: "Mie Ayam",
    category: "Indonesian Food",
    price: "Rp. 20.000",
    image: "/images/MieAyam.jpg",
  },
  {
    id: 3,
    title: "Ayam Bakar",
    category: "Western Food",
    price: "Rp. 35.000",
    image: "/images/AyamBakar.jpg",
  },
  {
    id: 4,
    title: "Gado-Gado",
    category: "Asian Food",
    price: "Rp. 18.000",
    image: "/images/GadoGado.jpg",
  },
  {
    id: 5,
    title: "Rendang",
    category: "Asian Food",
    price: "Rp. 27.000",
    image: "/images/rendang.jpg",
  },
];

const getPriceNumber = (priceString) => {
  return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
};

const filterSchema = Yup.object({
  search: Yup.string().max(30, "Maksimal 30 karakter pencarian"),
});

function FoodMenu() {
  const formik = useFormik({
    initialValues: { search: "", kategori: "all", sortBy: "" },
    validationSchema: filterSchema,
  });

  const displayedMenu = menuData
    .filter((menu) => {
      const matchSearch = menu.title
        .toLowerCase()
        .includes(formik.values.search.toLowerCase());
      const matchCategory =
        formik.values.kategori === "all" ||
        menu.category === formik.values.kategori;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (formik.values.sortBy === "murah")
        return getPriceNumber(a.price) - getPriceNumber(b.price);
      if (formik.values.sortBy === "mahal")
        return getPriceNumber(b.price) - getPriceNumber(a.price);
      return 0;
    });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #8b0000, #3e0000)",
        padding: 4,
      }}
    >
      {/* HEADER & FILTER */}
      <Card
        sx={{
          borderRadius: 4,
          padding: 3,
          marginBottom: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#8b0000" }}
          >
            Menu Makanan
          </Typography>
        </Box>

        <TextField
          fullWidth
          name="search"
          placeholder="Cari nama makanan..."
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2 }}
          value={formik.values.search}
          onChange={formik.handleChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
          helperText={formik.touched.search && formik.errors.search}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            name="kategori"
            label="Kategori"
            size="small"
            sx={{ minWidth: 150 }}
            value={formik.values.kategori}
            onChange={formik.handleChange}
          >
            <MenuItem value="all">Semua Kategori</MenuItem>
            <MenuItem value="Indonesian Food">Indonesian Food</MenuItem>
            <MenuItem value="Western Food">Western Food</MenuItem>
            <MenuItem value="Asian Food">Asian Food</MenuItem>
          </TextField>

          <TextField
            select
            name="sortBy"
            label="Urutkan Harga"
            size="small"
            sx={{ minWidth: 150 }}
            value={formik.values.sortBy}
            onChange={formik.handleChange}
          >
            <MenuItem value="">Normal</MenuItem>
            <MenuItem value="murah">Termurah</MenuItem>
            <MenuItem value="mahal">Termahal</MenuItem>
          </TextField>
        </Box>
      </Card>

      {/* GRID KARTU MAKANAN YANG SUDAH BERSIH */}
      <Grid container spacing={3}>
        {displayedMenu.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="white" textAlign="center">
              Makanan tidak ditemukan.
            </Typography>
          </Grid>
        ) : (
          displayedMenu.map((menu) => (
            <Grid item xs={12} sm={6} md={3} key={menu.id}>
              {/* Memanggil komponen FoodCard */}
              <FoodCard menu={menu} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default FoodMenu;
