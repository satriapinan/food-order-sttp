import { useFormik } from "formik"; // ganti useState jadi formik buat nyimpen search & filter
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// IMPORT KOMPONEN TOMBOL BUATAN BOSS
import AppButton from "../components/AppButton";

// Data dummy makanan agar codingan lebih bersih dan tinggal di-map
const foods = [
  {
    id: 1,
    category: "Indonesian Food",
    name: "Nasi Goreng",
    price: "Rp. 25.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 2,
    category: "Indonesian Food",
    name: "Mie Ayam",
    price: "Rp. 20.000",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
  },
  {
    id: 3,
    category: "Western Food",
    name: "Ayam Bakar",
    price: "Rp. 35.000",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400",
  },
  {
    id: 4,
    category: "Asian Food",
    name: "Gado-Gado",
    price: "Rp. 18.000",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  },
  {
    id: 5,
    category: "Desserts",
    name: "Es Krim Vanilla",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400",
  },
  {
    id: 6,
    category: "Desserts",
    name: "Es Krim Cokelat",
    price: "Rp. 15.000",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
  },
];

function FoodMenuPage() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // Berjaga-jaga kalau Boss butuh navigasi nantinya

  // formik nyimpen state search & filter (belum ada submit, cuma buat nampung value)
  const formik = useFormik({
    initialValues: {
      search: "",
      kategori: "",
      sortBy: "",
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Warna background biru tosca mirip seperti di gambar
        backgroundColor: "#6B9CAE",
        padding: { xs: 2, md: 5 },
      }}
    >
      {/* 1. BAGIAN HEADER (Judul, Search Bar, & Filter) */}
      <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 3, borderRadius: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#548394", mb: 0.5 }}>
          Food Menu
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
          Discover delicious meals just for you
        </Typography>

        {/* Search Field */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search for food..."
          variant="outlined"
          name="search" // name wajib ada biar formik tau ini field apa
          value={formik.values.search}
          onChange={formik.handleChange} // sebelumnya onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Dropdown Kategori & Sort By */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Kategori</InputLabel>
            <Select
              name="kategori"
              value={formik.values.kategori}
              label="Kategori"
              onChange={formik.handleChange} // sebelumnya onChange={(e) => setKategori(e.target.value)}
            >
              <MenuItem value="indo">Indonesian</MenuItem>
              <MenuItem value="western">Western</MenuItem>
              <MenuItem value="asian">Asian</MenuItem>
              <MenuItem value="dessert">Desserts</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={formik.values.sortBy}
              label="Sort By"
              onChange={formik.handleChange} // sebelumnya onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* 2. BAGIAN GRID DAFTAR MAKANAN */}
      <Box sx={{ maxWidth: 1000, margin: "0 auto" }}>
        <Grid container spacing={3} justifyContent="center">
          {/* Mapping data array menjadi barisan Card */}
          {foods.map((food) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={food.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Gambar Makanan */}
                <CardMedia component="img" height="140" image={food.image} alt={food.name} />

                <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                  {/* Badge Label Kategori */}
                  <Box
                    sx={{
                      backgroundColor: "#E4F0F6",
                      color: "#548394",
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {food.category}
                  </Box>

                  {/* Nama dan Harga Makanan */}
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {food.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#548394", fontWeight: "bold", mb: 2 }}>
                    {food.price}
                  </Typography>

                  {/* Bintang dan Ketersediaan */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <StarBorderIcon fontSize="small" sx={{ color: "#BDBDBD" }} />
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>
                      Available
                    </Typography>
                  </Box>

                  {/* Menggunakan AppButton buatan Boss! */}
                  <AppButton>Add to Cart</AppButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default FoodMenuPage;