import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import AppButton from "../components/AppButton";

const foodMenuSchema = Yup.object({
  foodName: Yup.string().required("Nama makanan harus diisi"),
  price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga tidak boleh bernilai negatif")
    .required("Harga harus diisi"),
  category: Yup.string().required("Kategori harus dipilih"),
});

function FoodMenuPage() {
  const formik = useFormik({
    initialValues: {
      foodName: "",
      price: "",
      category: "",
    },
    validationSchema: foodMenuSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Data Makanan:", values);
      alert("Menu berhasil ditambahkan!");
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FF9A9E, #FECFEF)", // Warna background beda sebagai penanda
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
          Tambah Menu Makanan
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="foodName"
            name="foodName"
            label="Nama Makanan"
            margin="normal"
            value={formik.values.foodName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.foodName && Boolean(formik.errors.foodName)}
            helperText={formik.touched.foodName && formik.errors.foodName}
          />

          <TextField
            fullWidth
            id="price"
            name="price"
            label="Harga (Rp)"
            type="number"
            margin="normal"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            select
            fullWidth
            id="category"
            name="category"
            label="Kategori"
            margin="normal"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            <MenuItem value="Makanan Utama">Makanan Utama</MenuItem>
            <MenuItem value="Minuman">Minuman</MenuItem>
            <MenuItem value="Camilan">Camilan</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
          </TextField>

          <Box sx={{ marginTop: 3 }}>
            <AppButton type="submit">Simpan Menu</AppButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default FoodMenuPage;
