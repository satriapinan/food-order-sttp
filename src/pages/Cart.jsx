import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

import { useTheme } from "../hooks/useTheme";
import api from "../services/api";

function Cart() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FORMAT RUPIAH
  // =========================

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // =========================
  // GET FOOD
  // =========================

  const fetchFoods = async () => {
    try {
      const response = await api.get("/food-order/foods");
      const fetchedFoods = response.data?.data || [];
      const savedCart = JSON.parse(localStorage.getItem("foodCart") || "[]");
      const mergedCart = fetchedFoods
        .filter((food) => food.isCart === true)
        .map((food) => {
          const saved = savedCart.find((item) => item.foodId === food.id);
          const quantity = saved?.quantity || 1;

          return {
            cartId: saved?.cartId || null,
            foodId: food.id,
            foodName: food.name,
            price: food.price,
            quantity,
            totalPrice: food.price * quantity,
          };
        });

      setCartItems(mergedCart);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal mengambil data makanan");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // BUILD CART
  // =========================

  useEffect(() => {
    const loadFoods = () => {
      fetchFoods();
    };

    queueMicrotask(loadFoods);
  }, []);

  // =========================
  // SAVE LOCAL CART INFO
  // =========================

  const saveLocalCart = (items) => {
    localStorage.setItem("foodCart", JSON.stringify(items));
  };

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    try {
      if (item.cartId) {
        await api.put(`/food-order/cart/qty/${item.cartId}`, {
          quantity,
        });
      }

      const updatedItems = cartItems.map((cartItem) =>
        cartItem.foodId === item.foodId
          ? {
              ...cartItem,
              quantity,
              totalPrice: cartItem.price * quantity,
            }
          : cartItem,
      );

      setCartItems(updatedItems);

      saveLocalCart(updatedItems);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengubah quantity");
    }
  };

  // =========================
  // DELETE
  // =========================

  const deleteCart = async (item) => {
    try {
      await api.delete(`/food-order/cart/${item.foodId}`);

      const updatedItems = cartItems.filter(
        (cartItem) => cartItem.foodId !== item.foodId,
      );

      setCartItems(updatedItems);

      saveLocalCart(updatedItems);

      await fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus makanan");
    }
  };

  // =========================
  // CHECKOUT
  // =========================
  const checkout = async () => {
    if (cartItems.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }

    const cartIds = cartItems
      .map((item) => item.cartId)
      .filter((id) => id !== null && id !== undefined);

    if (cartIds.length !== cartItems.length) {
      alert(
        "ID keranjang belum tersedia dari API. " +
          "Silakan refresh halaman dan coba lagi.",
      );

      return;
    }

    try {
      const response = await api.post("/food-order/cart/checkout", {
        cartId: cartIds,
      });

      console.log("Checkout response:", response.data);

      alert("Checkout berhasil!");

      localStorage.removeItem("foodCart");

      setCartItems([]);

      await fetchFoods();
    } catch (err) {
      console.error("Checkout error:", err);

      alert(err.response?.data?.message || "Checkout gagal.");
    }
  };

  // =========================
  // TOTAL
  // =========================

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }, [cartItems]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#22c55e",
          }}
        />
      </Box>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 60px)",
        boxSizing: "border-box",

        padding: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        backgroundColor: isDark ? "#151515" : "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: isDark ? "#ffffff" : "#111111",
            mb: 1,
          }}
        >
          Keranjang
        </Typography>

        <Typography
          sx={{
            color: isDark ? "#aaaaaa" : "#666666",
            mb: 4,
          }}
        >
          {totalItems} item dalam keranjang
        </Typography>

        {error && (
          <Paper
            sx={{
              padding: 3,
              mb: 3,
              color: "#ef4444",
            }}
          >
            {error}
          </Paper>
        )}

        {cartItems.length === 0 ? (
          <Paper
            sx={{
              padding: 6,
              textAlign: "center",
              backgroundColor: isDark ? "#1d1d1d" : "#ffffff",
              color: isDark ? "#ffffff" : "#111111",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Keranjang masih kosong
            </Typography>

            <Typography
              sx={{
                color: isDark ? "#999999" : "#666666",
              }}
            >
              Silakan pilih makanan dari menu.
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* =========================
        CART ITEMS
    ========================= */}

            <Box>
              {cartItems.map((item) => (
                <Paper
                  key={item.foodId}
                  sx={{
                    padding: 3,
                    mb: 2,
                    backgroundColor: isDark ? "#1d1d1d" : "#ffffff",
                    color: isDark ? "#ffffff" : "#111111",
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* FOOD INFO */}

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {item.foodName}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#22c55e",
                          fontWeight: 700,
                          mt: 0.5,
                        }}
                      >
                        {formatRupiah(item.price)}
                      </Typography>
                    </Box>

                    {/* QUANTITY */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 35,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => deleteCart(item)}
                        sx={{
                          color: "#ef4444",
                          ml: 1,
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* SUBTOTAL */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Subtotal</Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {formatRupiah(item.totalPrice)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* =========================
        RINGKASAN PESANAN
    ========================= */}

            <Paper
              sx={{
                width: "100%",
                boxSizing: "border-box",
                padding: {
                  xs: 2.5,
                  sm: 3,
                },

                backgroundColor: isDark ? "#1d1d1d" : "#ffffff",

                color: isDark ? "#ffffff" : "#111111",

                borderRadius: 3,

                border: isDark ? "1px solid #2a2a2a" : "1px solid #e5e5e5",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                }}
              >
                Ringkasan Pesanan
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography>Total Item</Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    color: "#22c55e",
                    fontWeight: 800,
                    fontSize: {
                      xs: 18,
                      sm: 20,
                    },
                  }}
                >
                  {formatRupiah(totalAmount)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={checkout}
                sx={{
                  backgroundColor: "#22c55e",
                  color: "#ffffff",
                  fontWeight: 800,
                  py: 1.5,

                  borderRadius: 2,

                  "&:hover": {
                    backgroundColor: "#16a34a",
                  },
                }}
              >
                CHECKOUT
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Cart;