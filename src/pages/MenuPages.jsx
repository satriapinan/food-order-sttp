import { useState, useEffect } from "react";
import { Box, Card, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";

import FoodCard from "../components/FoodCard"; 
import AppTextField from "../components/AppTextField"; 
import { useAuth } from "../hooks/useAuth"; 
import api from "../services/api"; 

function MenuPages() {
  const { user } = useAuth();
  
  const [daftarMenu, setDaftarMenu] = useState([]);
  const [kategoriTersedia, setKategoriTersedia] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  
  const [kataKunci, setKataKunci] = useState("");
  const [pilihanKategori, setPilihanKategori] = useState("");
  const [aturanUrut, setAturanUrut] = useState("");

  //  1. AMBIL KATEGORI
  useEffect(() => {
    const muatKategori = async () => {
      try {
        const res = await api.get("/food-order/categories");
        setKategoriTersedia(res.data.data);
      } catch (error) {
        console.error("Gagal memuat kategori:", error); 
      }
    };
    
    if (user?.token) muatKategori();
  }, [user?.token]);

  //  2. AMBIL MENU & LIVE SEARCH 
  useEffect(() => {
    if (!user?.token) return;

    const muatDaftarMenu = async () => {
      setSedangMemuat(true);
      try {
        let endpoint = `/food-order/foods?pageSize=100`;
        if (kataKunci) endpoint += `&foodName=${kataKunci}`;
        if (pilihanKategori) endpoint += `&categoryId=${pilihanKategori}`;
        if (aturanUrut) endpoint += `&sortBy=${aturanUrut}`;

        const response = await api.get(endpoint);
        setDaftarMenu(response.data.data);
      } catch (error) {
        console.error("Gagal memuat daftar menu:", error);
      } finally {
        setSedangMemuat(false);
      }
    };

    // Delay 300ms
    const delaySesaat = setTimeout(() => { 
      muatDaftarMenu(); 
    }, 300); 
    
    return () => clearTimeout(delaySesaat);
  }, [kataKunci, pilihanKategori, aturanUrut, user?.token]);

  return (
    <Box sx={{ padding: { xs: 2, md: 5 }, mt: 2 }}>
      
      {/* PANEL PENCARIAN & FILTER */}
      <Card sx={{ 
        maxWidth: 900, 
        margin: "0 auto", 
        padding: 4, 
        borderRadius: 4, 
        mb: 5, 
        boxShadow: "0 10px 30px rgba(224, 93, 54, 0.15)",
        bgcolor: "background.paper", 
        animation: "slideUpFade 0.8s ease-out forwards",
        "@keyframes slideUpFade": {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      }}>
        <Typography variant="h4" sx={{ fontWeight: "900", textAlign: "center", color: "#E05D36", mb: 1 }}>
          Eksplorasi Menu Kami 🍽️
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
          Pesan sekarang, hidangan panas siap diantar!
        </Typography>

        <AppTextField 
          name="searchMenu" label="Mau makan apa hari ini? 🔍"
          value={kataKunci} onChange={(e) => setKataKunci(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: "flex", gap: 3, flexWrap: { xs: "wrap", md: "nowrap" } }}>
          <FormControl size="small" fullWidth sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#E05D36" }, "& .MuiInputLabel-root.Mui-focused": { color: "#E05D36" } }}>
            <InputLabel>Saring Kategori</InputLabel>
            <Select value={pilihanKategori} label="Saring Kategori" onChange={(e) => setPilihanKategori(e.target.value)}>
              <MenuItem value=""><em>Semua Hidangan</em></MenuItem>
              {kategoriTersedia.map((kat) => (<MenuItem key={kat.id} value={kat.id}>{kat.categoryName}</MenuItem>))}
            </Select>
          </FormControl>
          
          <FormControl size="small" fullWidth sx={{ "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#E05D36" }, "& .MuiInputLabel-root.Mui-focused": { color: "#E05D36" } }}>
            <InputLabel>Urutkan Berdasarkan</InputLabel>
            <Select value={aturanUrut} label="Urutkan Berdasarkan" onChange={(e) => setAturanUrut(e.target.value)}>
              <MenuItem value=""><em>Rekomendasi Default</em></MenuItem>
              <MenuItem value="price,asc">Harga: Rendah ke Tinggi</MenuItem>
              <MenuItem value="price,desc">Harga: Tinggi ke Rendah</MenuItem>
              <MenuItem value="name,asc">Nama: A ke Z</MenuItem>
              <MenuItem value="name,desc">Nama: Z ke A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* GRID DAFTAR MAKANAN */}
      <Box sx={{ maxWidth: 1100, margin: "0 auto" }}>
        {sedangMemuat ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 8, color: "#E05D36", fontWeight: "bold" }}>
            Meracik hidangan... 🍳
          </Typography>
        ) : daftarMenu.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 8, color: "text.secondary" }}>
            Maaf, hidangan tidak tersedia. 🥲
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {daftarMenu.map((itemMenu) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={itemMenu.id}>
                <FoodCard item={itemMenu} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </Box>
  );
}

export default MenuPages;