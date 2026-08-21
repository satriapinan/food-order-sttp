import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Pagination,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Data dummy sesuai dengan gambar
const foodItems = [
  {
    id: 1,
    category: "Indonesian Food",
    title: "Nasi Goreng",
    price: "Rp. 25.000",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: 2,
    category: "Indonesian Food",
    title: "Mie Ayam",
    price: "Rp. 20.000",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: 3,
    category: "Western Food",
    title: "Ayam Bakar",
    price: "Rp. 35.000",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: 4,
    category: "Asian Food",
    title: "Gado-Gado",
    price: "Rp. 18.000",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: 5,
    category: "Desserts",
    title: "Es Krim Vanilla",
    price: "Rp. 15.000",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
];

// 1. Skema Validasi Pencarian dan Filter menggunakan Yup
const filterSchema = Yup.object({
  searchQuery: Yup.string().max(50, "Pencarian maksimal 50 karakter"),
  category: Yup.string(),
  sortBy: Yup.string(),
});

const MenuPage = () => {
  // 2. Setup Formik untuk menangani Search dan Filter
  const formik = useFormik({
    initialValues: {
      searchQuery: "",
      category: "",
      sortBy: "",
    },
    validationSchema: filterSchema,
    onSubmit: (values) => {
      // Saat menekan Enter di kolom pencarian, data ini siap dikirim/difilter
      console.log("Filter diterapkan:", values);
    },
  });

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #4da1a9 0%, #7db9b6 100%)",
        minHeight: "100vh",
        py: 4,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER SECTION - Dibungkus dengan form untuk Formik */}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            p: 4,
            mb: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ color: "#5297a1", mb: 1 }}
          >
            Food Menu
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            sx={{ mb: 3 }}
          >
            Discover delicious meals just for you
          </Typography>

          <TextField
            fullWidth
            id="searchQuery"
            name="searchQuery"
            placeholder="Search for food... (Tekan Enter untuk mencari)"
            size="small"
            variant="outlined"
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.searchQuery && Boolean(formik.errors.searchQuery)
            }
            helperText={formik.touched.searchQuery && formik.errors.searchQuery}
            sx={{ mb: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Select
              size="small"
              displayEmpty
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              sx={{ minWidth: 150, backgroundColor: "#f9f9f9" }}
            >
              <MenuItem value="" disabled>
                Kategori
              </MenuItem>
              <MenuItem value="indo">Indonesian Food</MenuItem>
              <MenuItem value="western">Western Food</MenuItem>
            </Select>

            <Select
              size="small"
              displayEmpty
              id="sortBy"
              name="sortBy"
              value={formik.values.sortBy}
              onChange={formik.handleChange}
              sx={{ minWidth: 150, backgroundColor: "#f9f9f9" }}
            >
              <MenuItem value="" disabled>
                Sort By
              </MenuItem>
              <MenuItem value="price">Lowest Price</MenuItem>
              <MenuItem value="name">Name A-Z</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* MENU GRID SECTION */}
        <Grid container spacing={3}>
          {foodItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  p: 1.5,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.title}
                  sx={{ borderRadius: "12px", objectFit: "cover", mb: 1.5 }}
                />
                <CardContent sx={{ p: 0, flexGrow: 1 }}>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      backgroundColor: "#e0f2f1",
                      color: "#4da1a9",
                      fontSize: "10px",
                      fontWeight: "bold",
                      mb: 1,
                      height: "20px",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: "#5297a1", mb: 1 }}
                  >
                    {item.price}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <StarBorderIcon sx={{ color: "#d1d1d1", fontSize: 20 }} />
                    <Typography variant="caption" color="textSecondary">
                      {item.status}
                    </Typography>
                  </Box>
                </CardContent>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#5297a1",
                    color: "#fff",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#3e7982" },
                  }}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FOOTER PAGINATION SECTION */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            p: 2,
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" color="textSecondary">
              Page Size:
            </Typography>
            <Select size="small" defaultValue={8} sx={{ height: 30 }}>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
            </Select>
          </Box>

          <Pagination count={1} color="primary" />

          <Typography variant="caption" color="textSecondary">
            Showing 1-5 of 5 items
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MenuPage;
