import { useState, useEffect, useMemo } from "react";
import { Box, Card, Typography, Grid, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FoodCard from "../components/FoodCard";
import AppTextField from "../components/AppTextField";
import AppSelect from "../components/AppSelect";
import AppSnackbar from "../components/AppSnackbar";
import api from "../services/api";

const filterSchema = Yup.object({
  search: Yup.string().max(30, "Maksimal 30 karakter pencarian"),
});

function FoodMenu() {
  const [daftarMakanan, setDaftarMakanan] = useState([]);
  const [daftarKategori, setDaftarKategori] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [notifikasi, setNotifikasi] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: { search: "", category: "", sortBy: "" },
    validationSchema: filterSchema,
  });
  const {
    search: cari,
    category: kategori,
    sortBy: urutkanBerdasarkan,
  } = formik.values;

  const handleCloseSnackbar = () => {
    setNotifikasi({ ...notifikasi, open: false });
  };

  useEffect(() => {
    api
      .get("/food-order/categories")
      .then((res) => {
        setDaftarKategori(res.data.data || res.data || []);
      })
      .catch((err) => {
        console.error("Gagal mengambil data kategori:", err);
      });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      setSedangMemuat(true);
      try {
        const params = { pageSize: 100 };
        if (cari) params.foodName = cari;
        if (kategori) params.categoryId = kategori;
        if (urutkanBerdasarkan) params.sortBy = urutkanBerdasarkan;

        const res = await api.get("/food-order/foods", { params });
        setDaftarMakanan(res.data.data || []);
      } catch (err) {
        setNotifikasi({
          open: true,
          message: "Gagal mengambil data makanan",
          severity: "error",
        });
      } finally {
        setSedangMemuat(false);
      }
    };

    // Menambahkan sedikit penundaan (debounce) saat mengetik pencarian
    const timeoutId = setTimeout(() => {
      fetchFoods();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cari, kategori, urutkanBerdasarkan]);

  const pilihanKategori = useMemo(() => {
    const opsi = Array.isArray(daftarKategori) ? daftarKategori : [];
    return [
      { value: "", label: "Semua Kategori" },
      ...opsi.map((k) => ({
        value: String(k.id),
        label: k.categoryName,
      })),
    ];
  }, [daftarKategori]);

  const pilihanUrutan = [
    { value: "", label: "Normal" },
    { value: "price,asc", label: "Termurah" },
    { value: "price,desc", label: "Termahal" },
  ];

  const handleAddToCart = async (makanan) => {
    try {
      await api.post("/food-order/cart", { foodId: makanan.id });
      setNotifikasi({
        open: true,
        message: `${makanan.name || "Makanan"} berhasil ditambahkan ke keranjang!`,
        severity: "success",
      });
    } catch (err) {
      setNotifikasi({
        open: true,
        message:
          err.response?.data?.message || "Gagal menambahkan ke keranjang",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* BAGIAN HEADER & FILTER */}
      <Card
        sx={{
          borderRadius: 4,
          padding: 3,
          marginBottom: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Menu Makanan
          </Typography>
        </Box>

        <AppTextField
          name="search"
          placeholder="Cari nama makanan..."
          sx={{ marginBottom: 2 }}
          value={formik.values.search}
          onChange={formik.handleChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
          helperText={formik.touched.search && formik.errors.search}
        />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <AppSelect
            name="category"
            label="Kategori"
            sx={{ minWidth: 200 }}
            value={formik.values.category}
            onChange={formik.handleChange}
            options={pilihanKategori}
          />

          <AppSelect
            name="sortBy"
            label="Urutkan Harga"
            sx={{ minWidth: 200 }}
            value={formik.values.sortBy}
            onChange={formik.handleChange}
            options={pilihanUrutan}
          />
        </Box>
      </Card>

      {/* GRID KARTU MAKANAN DARI API */}
      {sedangMemuat ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {daftarMakanan.length === 0 ? (
            <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
              <Typography variant="h6" color="text.secondary" align="center">
                Makanan tidak ditemukan.
              </Typography>
            </Grid>
          ) : (
            daftarMakanan.map((makanan) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={makanan.id}>
                <FoodCard
                  menu={makanan}
                  onAddToCart={() => handleAddToCart(makanan)}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}

      <AppSnackbar
        open={notifikasi.open}
        message={notifikasi.message}
        severity={notifikasi.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default FoodMenu;
