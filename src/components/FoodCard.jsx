
import { useState } from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import AppButton from "./AppButton";
import AppSnackbar from "./AppSnackbar"; 
import api from "../services/api";

function FoodCard({ item }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [sedangMenambahkan, setSedangMenambahkan] = useState(false);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
  };

  const handleTambahKeranjang = async () => {
    setSedangMenambahkan(true);
    try {
      await api.post("/food-order/cart", { foodId: item.id });
      setSnackbar({ open: true, message: `${item.name} berhasil masuk keranjang! 🍽️`, severity: "success" });
    } catch (error) {
      console.error("Gagal menambah keranjang:", error); 
      setSnackbar({ open: true, message: "Gagal masuk keranjang.", severity: "error" });
    } finally {
      setSedangMenambahkan(false);
    }
  };

  // Pencocokan Nama Spesifik 🔥
  const getGambarSesuaiKategori = (namaMakanan, idKategori) => {
    const nama = namaMakanan.toLowerCase();

    // 1. Cek Nama Menu Spesifik
    if (nama.includes("nasi goreng")) return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80"; 
    if (nama.includes("mie ayam")) return "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80"; 
    if (nama.includes("ayam bakar")) return "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&q=80"; 
    if (nama.includes("gado-gado") || nama.includes("gado")) return "https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
    if (nama.includes("rendang")) return "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&q=80"; 
    if (nama.includes("spaghetti") || nama.includes("spageti")) return "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
    if (nama.includes("sushi")) return "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80"; 
    if (nama.includes("pudding") || nama.includes("es krim")) return "https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=444&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // 2. Kalau tidak ada di daftar atas, pakai gambar kategori
    switch(idKategori) {
      case 1: return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80"; // Indonesian
      case 2: return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"; // Western
      case 3: return "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80"; // Asian
      case 4: return "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80"; // Dessert
      default: return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"; // Random Default
    }
  };

  return (
    <>
      <Card sx={{ 
        borderRadius: 4, height: "100%", display: "flex", flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": { transform: "translateY(-8px)", boxShadow: "0 15px 30px rgba(224, 93, 54, 0.2)" }
      }}>
        
        {/* Gambar otomatis cerdas */}
        <CardMedia 
          component="img" 
          height="180" 
          image={getGambarSesuaiKategori(item.name, item.categoryId)} 
          alt={item.name} 
          sx={{ objectFit: "cover" }} 
        />

        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.categories?.categoryName || "Umum"}</Typography>
          <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>{item.description}</Typography>
          <Typography variant="h6" color="#E05D36" fontWeight="bold" sx={{ mt: "auto", mb: 2 }}>{formatRupiah(item.price)}</Typography>
          <AppButton onClick={handleTambahKeranjang} disabled={sedangMenambahkan} sx={{ mt: 0 }}>
            {sedangMenambahkan ? "Memasak..." : "Tambah 🛒"}
          </AppButton>
        </CardContent>
      </Card>
      
      <AppSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} />
    </>
  );
}

export default FoodCard;