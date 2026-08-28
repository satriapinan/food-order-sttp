import { useEffect, useMemo, useState } from "react";

import {
  Alert,
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

  const [processingId, setProcessingId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // =========================
  // FORMAT RUPIAH
  // =========================

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // =========================
  // GET CART DARI API
  // =========================

  const fetchCart = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await api.get(
      "/food-order/foods/cart"
    );

    console.log("CART API:", response.data);

    const apiCart =
      response.data?.data || [];

    const formattedCart = apiCart.map(
      (item) => ({
        cartId: item.id,
        foodId: item.foodId,
        foodName: item.foodName,
        price: Number(item.price),
        quantity: Number(item.quantity),
        totalPrice: Number(item.totalPrice),
      })
    );

    setCartItems(formattedCart);

  } catch (err) {
    console.error(
      "Fetch cart error:",
      err
    );

    setError(
      err.response?.data?.message ||
        "Gagal mengambil data keranjang"
    );

  } finally {
    setLoading(false);
  }
};

  // =========================
  // LOAD CART
  // =========================

  useEffect(() => {
  const timeoutId = setTimeout(() => {
    fetchCart();
  }, 0);

  return () => clearTimeout(timeoutId);
}, []);

  // =========================
  // UPDATE QUANTITY
  // =========================
const updateQuantity = async (item, quantity) => {
  if (quantity < 1) return;

  try {
    setProcessingId(item.cartId);

    await api.put(
      `/food-order/cart/qty/${item.cartId}`,
      {
        quantity,
      }
    );

    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.cartId === item.cartId
          ? {
              ...cartItem,
              quantity,
              totalPrice:
                cartItem.price * quantity,
            }
          : cartItem
      )
    );

  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Gagal mengubah quantity"
    );
  } finally {
    setProcessingId(null);
  }
};

  // =========================
  // DELETE
  // =========================

const deleteCart = async (item) => {
  try {
    setProcessingId(item.cartId);

    await api.delete(
      `/food-order/cart/${item.foodId}`
    );

    setCartItems((currentItems) =>
      currentItems.filter(
        (cartItem) =>
          cartItem.foodId !== item.foodId
      )
    );

  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Gagal menghapus makanan"
    );
  } finally {
    setProcessingId(null);
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
    .filter(
      (id) =>
        id !== null &&
        id !== undefined
    );

  console.log("Cart IDs:", cartIds);

  if (cartIds.length !== cartItems.length) {
    alert(
      "ID keranjang belum tersedia dari API."
    );

    return;
  }

  try {
    setCheckoutLoading(true);

    const response = await api.post(
      "/food-order/cart/checkout",
      {
        cartId: cartIds,
      }
    );

    console.log(
      "Checkout response:",
      response.data
    );

    alert("Checkout berhasil!");

    setCartItems([]);

    await fetchCart();

  } catch (err) {
    console.error(
      "Checkout error:",
      err
    );

    alert(
      err.response?.data?.message ||
        "Checkout gagal."
    );
  } finally {
    setCheckoutLoading(false);
  }
};
  // =========================
  // TOTAL ITEM
  // =========================

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  // =========================
  // TOTAL HARGA
  // =========================

  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.totalPrice,
      0
    );
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

        backgroundColor: isDark
          ? "#151515"
          : "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: isDark
              ? "#ffffff"
              : "#111111",
            mb: 1,
          }}
        >
          Keranjang
        </Typography>

        <Typography
          sx={{
            color: isDark
              ? "#aaaaaa"
              : "#666666",
            mb: 4,
          }}
        >
          {totalItems} item dalam
          keranjang
        </Typography>

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
            EMPTY CART
        ========================= */}

        {cartItems.length === 0 ? (
          <Paper
            sx={{
              padding: 6,
              textAlign: "center",

              backgroundColor:
                isDark
                  ? "#1d1d1d"
                  : "#ffffff",

              color: isDark
                ? "#ffffff"
                : "#111111",

              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1 }}
            >
              Keranjang masih kosong
            </Typography>

            <Typography
              sx={{
                color: isDark
                  ? "#999999"
                  : "#666666",
              }}
            >
              Silakan pilih makanan
              dari menu.
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
              {cartItems.map((item) => {
                const isProcessing =
                  processingId ===
                  item.cartId;

                return (
                  <Paper
                    key={item.cartId}
                    sx={{
                      padding: 3,
                      mb: 2,

                      backgroundColor:
                        isDark
                          ? "#1d1d1d"
                          : "#ffffff",

                      color: isDark
                        ? "#ffffff"
                        : "#111111",

                      borderRadius: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        gap: 2,
                        flexWrap:
                          "wrap",
                      }}
                    >
                      {/* FOOD INFO */}

                      <Box
                        sx={{
                          flex: 1,
                          minWidth:
                            "180px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {
                            item.foodName
                          }
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              "#22c55e",
                            fontWeight: 700,
                            mt: 0.5,
                          }}
                        >
                          {formatRupiah(
                            item.price
                          )}
                        </Typography>
                      </Box>

                      {/* QUANTITY */}

                      <Box
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            updateQuantity(
                              item,
                              item.quantity -
                                1
                            )
                          }
                          disabled={
                            item.quantity <=
                              1 ||
                            isProcessing
                          }
                          sx={{
                            color:
                              isDark
                                ? "#ffffff"
                                : "#111111",
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 35,
                            textAlign:
                              "center",
                            fontWeight: 700,
                          }}
                        >
                          {
                            item.quantity
                          }
                        </Typography>

                        <IconButton
                          onClick={() =>
                            updateQuantity(
                              item,
                              item.quantity +
                                1
                            )
                          }
                          disabled={
                            isProcessing
                          }
                          sx={{
                            color:
                              isDark
                                ? "#ffffff"
                                : "#111111",
                          }}
                        >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            deleteCart(
                              item
                            )
                          }
                          disabled={
                            isProcessing
                          }
                          sx={{
                            color:
                              "#ef4444",
                            ml: 1,
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Divider
                      sx={{ my: 2 }}
                    />

                    {/* SUBTOTAL */}

                    <Box
                      sx={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                      }}
                    >
                      <Typography>
                        Subtotal
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {formatRupiah(
                          item.totalPrice
                        )}
                      </Typography>
                    </Box>
                  </Paper>
                );
              })}
            </Box>

            {/* =========================
                RINGKASAN PESANAN
            ========================= */}

            <Paper
              sx={{
                width: "100%",
                boxSizing:
                  "border-box",

                padding: {
                  xs: 2.5,
                  sm: 3,
                },

                backgroundColor:
                  isDark
                    ? "#1d1d1d"
                    : "#ffffff",

                color: isDark
                  ? "#ffffff"
                  : "#111111",

                borderRadius: 3,

                border: isDark
                  ? "1px solid #2a2a2a"
                  : "1px solid #e5e5e5",
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
                  justifyContent:
                    "space-between",
                  mb: 2,
                }}
              >
                <Typography>
                  Total Item
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </Typography>
              </Box>

              <Divider
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
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
                    color:
                      "#22c55e",
                    fontWeight: 800,
                    fontSize: {
                      xs: 18,
                      sm: 20,
                    },
                  }}
                >
                  {formatRupiah(
                    totalAmount
                  )}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={checkout}
                disabled={
                  checkoutLoading
                }
                sx={{
                  backgroundColor:
                    "#22c55e",

                  color: "#ffffff",

                  fontWeight: 800,

                  py: 1.5,

                  borderRadius: 2,

                  "&:hover": {
                    backgroundColor:
                      "#16a34a",
                  },
                }}
              >
                {checkoutLoading
                  ? "MEMPROSES..."
                  : "CHECKOUT"}
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Cart;