import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import FoodCard from "../components/FoodCard";
import AppSelect from "../components/AppSelect";
import AppSnackbar from "../components/AppSnackbar";

import {
  getFoods,
  getCategories,
  addToCart,
} from "../services/foodService";

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingFoodId, setAddingFoodId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // =========================
  // FETCH FOODS & CATEGORIES
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          foodResponse,
          categoryResponse,
        ] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);

        // =========================
        // FOOD RESPONSE
        // =========================

        setFoods(foodResponse?.data || []);

        // =========================
        // CATEGORY RESPONSE
        // =========================

        setCategories(
          categoryResponse?.data ||
            categoryResponse ||
            []
        );
      } catch (err) {
        console.error(
          "Fetch food/category error:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data makanan."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredFoods = useMemo(() => {
    let result = [...foods];

    // =========================
    // SEARCH
    // =========================

    if (search.trim()) {
      const keyword = search
        .toLowerCase()
        .trim();

      result = result.filter((food) =>
        food.name
          ?.toLowerCase()
          .includes(keyword)
      );
    }

    // =========================
    // CATEGORY
    // =========================

    if (category !== "all") {
      result = result.filter(
        (food) =>
          String(food.categoryId) ===
          String(category)
      );
    }

    // =========================
    // SORT
    // =========================

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
        break;

      case "name-az":
        result.sort((a, b) =>
          String(a.name || "").localeCompare(
            String(b.name || "")
          )
        );
        break;

      case "name-za":
        result.sort((a, b) =>
          String(b.name || "").localeCompare(
            String(a.name || "")
          )
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    foods,
    search,
    category,
    sort,
  ]);

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async (food) => {
    if (!food?.id) {
      setSnackbar({
        open: true,
        message:
          "Data makanan tidak memiliki ID.",
        severity: "error",
      });

      return;
    }

    setAddingFoodId(food.id);

    try {
      // =========================
      // REQUEST KE BACKEND
      // =========================

      await addToCart(food.id, 1);

      // =========================
      // UPDATE STATUS FOOD
      // =========================

      setFoods((currentFoods) =>
        currentFoods.map((item) =>
          item.id === food.id
            ? {
                ...item,
                isCart: true,
              }
            : item
        )
      );

      // =========================
      // SNACKBAR SUCCESS
      // =========================

      setSnackbar({
        open: true,
        message: `${food.name} berhasil ditambahkan ke keranjang.`,
        severity: "success",
      });
    } catch (err) {
      console.error(
        "Add to cart error:",
        err
      );

      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Gagal menambahkan makanan ke keranjang.",
        severity: "error",
      });
    } finally {
      setAddingFoodId(null);
    }
  };

  // =========================
  // CATEGORY OPTIONS
  // =========================

  const categoryOptions = [
    {
      value: "all",
      label: "Semua Kategori",
    },

    ...categories.map((item) => ({
      value: item.id,
      label:
        item.categoryName ||
        item.name ||
        "Kategori",
    })),
  ];

  // =========================
  // SORT OPTIONS
  // =========================

  const sortOptions = [
    {
      value: "default",
      label: "Urutan Default",
    },
    {
      value: "price-low",
      label: "Harga Terendah",
    },
    {
      value: "price-high",
      label: "Harga Tertinggi",
    },
    {
      value: "name-az",
      label: "Nama A-Z",
    },
    {
      value: "name-za",
      label: "Nama Z-A",
    },
  ];

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Food Menu
        </Typography>

        <Typography color="text.secondary">
          Pilih makanan favoritmu
        </Typography>
      </Box>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* =========================
          FILTER
      ========================= */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "2fr 1fr 1fr",
          },
          gap: 2,
          mb: 4,
        }}
      >
        {/* SEARCH */}

        <TextField
          fullWidth
          size="small"
          label="Cari makanan"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Cari berdasarkan nama..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* CATEGORY */}

        <AppSelect
          label="Kategori"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          options={categoryOptions}
        />

        {/* SORT */}

        <AppSelect
          label="Urutkan"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          options={sortOptions}
        />
      </Box>

      {/* =========================
          RESULT INFO
      ========================= */}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Menampilkan{" "}
        <strong>
          {filteredFoods.length}
        </strong>{" "}
        makanan
      </Typography>

      {/* =========================
          FOOD LIST
      ========================= */}

      {filteredFoods.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
          >
            Makanan tidak ditemukan
          </Typography>

          <Typography color="text.secondary">
            Coba gunakan kata kunci atau
            kategori lain.
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
        >
          {filteredFoods.map((food) => (
            <Grid
              item
              key={food.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <FoodCard
                food={food}
                onAddToCart={
                  handleAddToCart
                }
                loading={
                  addingFoodId === food.id
                }
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* =========================
          SNACKBAR
      ========================= */}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      />
    </Container>
  );
}

export default FoodMenu;