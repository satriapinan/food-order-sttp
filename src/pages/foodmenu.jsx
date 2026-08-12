import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// Memanggil komponen AppButton yang sudah kamu buat sebelumnya
import AppButton from "../components/AppButton";

// 1. DATA DUMMY: Daftar menu makanan
//Pisahkan data dari tampilan agar rapi
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

function FoodMenu() {
  // State untuk menyimpan pilihan filter
  const [kategori, setKategori] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #8b0000, #3e0000)",
        padding: 4,
      }}
    >
      {/* BAGIAN ATAS: Header & Filter Pencarian */}
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
          <Typography variant="body2" color="text.secondary">
            Temukan hidangan lezat khusus untuk Anda
          </Typography>
        </Box>

        {/* Kolom Pencarian */}
        <TextField
          fullWidth
          placeholder="Cari makanan..."
          variant="outlined"
          size="small"
          sx={{ marginBottom: 2 }}
        />

        {/* Dropdown Kategori & Sort By */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            label="Kategori"
            size="small"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">Semua</MenuItem>
            <MenuItem value="indonesian">Indonesian Food</MenuItem>
            <MenuItem value="Western">Western Food</MenuItem>
            <MenuItem value="Asian">Asian Food</MenuItem>
          </TextField>

          <TextField
            select
            label="Sort By"
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="murah">Termurah</MenuItem>
            <MenuItem value="mahal">Termahal</MenuItem>
          </TextField>
        </Box>
      </Card>

      {/* BAGIAN BAWAH: Grid Daftar Makanan */}
      <Grid container spacing={3}>
        {/* Melakukan perulangan (looping) data menuData menjadi kartu */}
        {menuData.map((menu) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={menu.id}>
            <Card
              sx={{
                borderRadius: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {/* Gambar Makanan */}
              <CardMedia
                component="img"
                height="160"
                image={menu.image}
                alt={menu.title}
              />

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                {/* Label Kategori */}
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={menu.category}
                    size="small"
                    sx={{
                      backgroundColor: "#ffebee",
                      color: "#b22222",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                  />
                </Box>

                {/* Judul & Harga */}
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {menu.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#b22222", mb: 2 }}
                >
                  {menu.price}
                </Typography>

                {/* Bintang & Status Available */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: "auto",
                    mb: 1,
                  }}
                >
                  <IconButton size="small">
                    <StarBorderIcon sx={{ color: "#b0bec5" }} />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: "bold" }}
                  >
                    Tersedia
                  </Typography>
                </Box>

                {/* Tombol Add to Cart memanggil AppButton */}
                <AppButton fullWidth>Tambahkan ke Keranjang</AppButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FoodMenu;
