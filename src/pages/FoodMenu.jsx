import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import FoodCard from "../components/FoodCard";
import AppSelect from "../components/AppSelect";
import AppSnackbar from "../components/AppSnackbar";

import { getFoods, getCategories, addToCart } from "../services/foodService";

import { useTheme } from "../hooks/useTheme";

function FoodMenu() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

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

  // =====================================================
  // COLORS
  // =====================================================

  const colors = {
    background: isDark ? "#101a14" : "#f7faf8",

    surface: isDark ? "#18251d" : "#ffffff",

    surfaceSoft: isDark ? "#1d2c22" : "#f0f7f2",

    text: isDark ? "#f5f7f6" : "#17221b",

    textSecondary: isDark ? "#b6c4ba" : "#647067",

    primary: "#16a34a",

    primaryLight: "#22c55e",

    border: isDark ? "#2b4433" : "#dce9df",
  };

  // =====================================================
  // FETCH FOODS & CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [foodResponse, categoryResponse] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);

        setFoods(foodResponse?.data || []);

        setCategories(categoryResponse?.data || categoryResponse || []);
      } catch (err) {
        console.error("Fetch food error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data makanan.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredFoods = useMemo(() => {
    let result = [...foods];

    // SEARCH
    if (search.trim()) {
      const keyword = search.toLowerCase().trim();

      result = result.filter((food) =>
        food.name?.toLowerCase().includes(keyword),
      );
    }

    // CATEGORY
    if (category !== "all") {
      result = result.filter(
        (food) => String(food.categoryId) === String(category),
      );
    }

    // SORT
    switch (sort) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return result;
  }, [foods, search, category, sort]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async (food) => {
    setAddingFoodId(food.id);

    try {
      await addToCart(food.id, 1);

      setFoods((currentFoods) =>
        currentFoods.map((item) =>
          item.id === food.id
            ? {
                ...item,
                isCart: true,
              }
            : item,
        ),
      );

      setSnackbar({
        open: true,
        message: `${food.name} berhasil ditambahkan ke keranjang.`,
        severity: "success",
      });
    } catch (err) {
      console.error("Add cart error:", err);

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

  // =====================================================
  // CATEGORY OPTIONS
  // =====================================================

  const categoryOptions = [
    {
      value: "all",
      label: "Semua Kategori",
    },

    ...categories.map((item) => ({
      value: item.id,
      label: item.categoryName || item.name || "Kategori",
    })),
  ];

  // =====================================================
  // SORT OPTIONS
  // =====================================================

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgress
            size={42}
            thickness={4}
            sx={{
              color: colors.primary,
            }}
          />

          <Typography
            sx={{
              mt: 2,
              color: colors.textSecondary,
              fontWeight: 600,
            }}
          >
            Memuat menu...
          </Typography>
        </Box>
      </Box>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        transition: "all 0.3s ease",
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* =================================================
            HERO HEADER
        ================================================= */}

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            p: {
              xs: 2.5,
              sm: 4,
              md: 5,
            },

            mb: {
              xs: 2.5,
              sm: 3,
            },

            background: isDark
              ? "linear-gradient(135deg, #182c20 0%, #203b2a 55%, #16231b 100%)"
              : "linear-gradient(135deg, #e7f7eb 0%, #f7fcf8 55%, #e2f3e7 100%)",

            border: `1px solid ${colors.border}`,

            boxShadow: isDark
              ? "0 12px 35px rgba(0,0,0,0.20)"
              : "0 12px 35px rgba(22,163,74,0.08)",
          }}
        >
          {/* DECORATION */}

          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.10)",
              right: -70,
              top: -80,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(34,197,94,0.08)",
              right: 80,
              bottom: -55,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 44,
                  sm: 52,
                },

                height: {
                  xs: 44,
                  sm: 52,
                },

                borderRadius: 2.5,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundColor: colors.primary,

                color: "#ffffff",

                boxShadow: "0 8px 20px rgba(22,163,74,0.25)",
              }}
            >
              <RestaurantMenuIcon
                sx={{
                  fontSize: {
                    xs: 25,
                    sm: 30,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 25,
                    sm: 32,
                    md: 38,
                  },

                  lineHeight: 1.1,

                  fontWeight: 900,

                  color: colors.text,

                  letterSpacing: "-0.8px",
                }}
              >
                Food Menu
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: {
                    xs: 13,
                    sm: 15,
                  },

                  color: colors.textSecondary,
                }}
              >
                Temukan makanan favoritmu hari ini
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },

            mb: 3,

            borderRadius: 3,

            backgroundColor: colors.surface,

            border: `1px solid ${colors.border}`,

            boxShadow: isDark
              ? "0 8px 25px rgba(0,0,0,0.12)"
              : "0 8px 25px rgba(0,0,0,0.04)",
          }}
        >
          <Typography
            sx={{
              mb: 2,

              fontWeight: 800,

              color: colors.text,

              fontSize: {
                xs: 15,
                sm: 16,
              },
            }}
          >
            Cari & Filter Menu
          </Typography>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "2fr 1fr 1fr",
              },

              gap: 2,
            }}
          >
            {/* SEARCH */}

            <TextField
              fullWidth
              size="small"
              label="Cari makanan"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari berdasarkan nama..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,

                  backgroundColor: colors.surfaceSoft,

                  "& fieldset": {
                    borderColor: colors.border,
                  },

                  "&:hover fieldset": {
                    borderColor: colors.primary,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.primary,
                  },
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.primary,
                },
              }}
            />

            {/* CATEGORY */}

            <AppSelect
              label="Kategori"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              options={categoryOptions}
            />

            {/* SORT */}

            <AppSelect
              label="Urutkan"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              options={sortOptions}
            />
          </Box>
        </Box>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* =================================================
            RESULT HEADER
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            mb: 2,

            gap: 2,

            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 19,
                  sm: 22,
                },

                fontWeight: 800,

                color: colors.text,
              }}
            >
              Pilihan Makanan
            </Typography>

            <Typography
              sx={{
                fontSize: 13,

                color: colors.textSecondary,

                mt: 0.3,
              }}
            >
              Pilih makanan yang ingin kamu pesan
            </Typography>
          </Box>

          <Box
            sx={{
              px: 2,
              py: 0.8,

              borderRadius: 5,

              backgroundColor: isDark ? "#1c3524" : "#e8f7ec",

              color: colors.primary,

              fontSize: 13,

              fontWeight: 800,

              border: `1px solid ${isDark ? "#315c3c" : "#cdebd4"}`,
            }}
          >
            {filteredFoods.length} makanan
          </Box>
        </Box>

        {/* =================================================
            FOOD LIST
        ================================================= */}

        {filteredFoods.length === 0 ? (
          <Box
            sx={{
              py: {
                xs: 7,
                sm: 9,
              },

              px: 2,

              textAlign: "center",

              backgroundColor: colors.surface,

              borderRadius: 3,

              border: `1px solid ${colors.border}`,
            }}
          >
            <RestaurantMenuIcon
              sx={{
                fontSize: 50,

                color: colors.primary,

                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,

                color: colors.text,

                mb: 0.5,
              }}
            >
              Makanan tidak ditemukan
            </Typography>

            <Typography
              sx={{
                color: colors.textSecondary,

                fontSize: 14,
              }}
            >
              Coba gunakan kata kunci atau kategori lain.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },

              gap: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },

              alignItems: "stretch",
            }}
          >
            {filteredFoods.map((food) => (
              <Box
                key={food.id}
                sx={{
                  minWidth: 0,

                  height: "100%",

                  "& > *": {
                    height: "100%",
                  },
                }}
              >
                <FoodCard
                  food={food}
                  onAddToCart={handleAddToCart}
                  loading={addingFoodId === food.id}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* =================================================
            FOOTER INFO
        ================================================= */}

        {filteredFoods.length > 0 && (
          <Box
            sx={{
              mt: 4,

              py: 2,

              textAlign: "center",

              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,

                color: colors.textSecondary,
              }}
            >
              Menampilkan{" "}
              <Box
                component="span"
                sx={{
                  color: colors.primary,

                  fontWeight: 800,
                }}
              >
                {filteredFoods.length}
              </Box>{" "}
              dari{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 800,

                  color: colors.text,
                }}
              >
                {foods.length}
              </Box>{" "}
              menu makanan
            </Typography>
          </Box>
        )}

        {/* =================================================
            SNACKBAR
        ================================================= */}

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
    </Box>
  );
}

export default FoodMenu;
