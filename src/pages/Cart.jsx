import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

import {
  getCart,
  updateCartQty,
  removeCartByCartId,
  checkout,
} from "../services/foodService";

import AppSnackbar from "../components/AppSnackbar";

function Cart() {
  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // =========================
  // FETCH CART
  // =========================

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCart();

      /*
       * Backend kemungkinan mengembalikan:
       * { data: [...] }
       *
       * Kita ambil data secara aman.
       */
      setCart(
        Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data keranjang."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCart();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // TOTAL
  // =========================

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(
        item.food?.price ??
          item.price ??
          0
      );

      const qty = Number(
        item.qty ??
          item.quantity ??
          1
      );

      return sum + price * qty;
    }, 0);
  }, [cart]);

  // =========================
  // UPDATE QTY
  // =========================

  const handleUpdateQty = async (
    item,
    newQty
  ) => {
    if (newQty < 1) return;

    const cartId = item.id;

    try {
      setUpdatingId(cartId);

      await updateCartQty(
        cartId,
        newQty
      );

      setCart((currentCart) =>
        currentCart.map((cartItem) =>
          cartItem.id === cartId
            ? {
                ...cartItem,
                qty: newQty,
                quantity: newQty,
              }
            : cartItem
        )
      );
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Gagal mengubah jumlah.",
        severity: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (item) => {
    try {
      setDeletingId(item.id);

      await removeCartByCartId(item.id);

      setCart((currentCart) =>
        currentCart.filter(
          (cartItem) =>
            cartItem.id !== item.id
        )
      );

      setSnackbar({
        open: true,
        message: "Makanan dihapus dari keranjang.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Gagal menghapus makanan.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // CHECKOUT
  // =========================

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return;
    }

    try {
      setCheckoutLoading(true);

      await checkout();

      setCart([]);

      setSnackbar({
        open: true,
        message:
          "Checkout berhasil dilakukan!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Checkout gagal.",
        severity: "error",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Keranjang
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Periksa pesananmu sebelum checkout.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {cart.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
          >
            Keranjang masih kosong
          </Typography>

          <Typography color="text.secondary">
            Silakan pilih makanan terlebih dahulu.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gap: 3,
          }}
        >
          {/* CART ITEMS */}

          <Box>
            {cart.map((item) => {
              const food = item.food ?? item;

              const name =
                food.name ??
                item.name ??
                "Makanan";

              const price = Number(
                food.price ??
                  item.price ??
                  0
              );

              const qty = Number(
                item.qty ??
                  item.quantity ??
                  1
              );

              const subtotal =
                price * qty;

              return (
                <Paper
                  key={item.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight="bold"
                      >
                        {name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Rp{" "}
                        {price.toLocaleString(
                          "id-ID"
                        )}{" "}
                        / item
                      </Typography>

                      <Typography
                        color="success.main"
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        Rp{" "}
                        {subtotal.toLocaleString(
                          "id-ID"
                        )}
                      </Typography>
                    </Box>

                    {/* QTY */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            qty - 1
                          )
                        }
                        disabled={
                          qty <= 1 ||
                          updatingId ===
                            item.id
                        }
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: 35,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {qty}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            qty + 1
                          )
                        }
                        disabled={
                          updatingId ===
                          item.id
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>

                    {/* DELETE */}

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(item)
                      }
                      disabled={
                        deletingId ===
                        item.id
                      }
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          {/* SUMMARY */}

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: "fit-content",
              position: {
                md: "sticky",
              },
              top: {
                md: 20,
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Ringkasan Pesanan
            </Typography>

            <Divider sx={{ my: 2 }} />

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

              <Typography fontWeight="bold">
                {cart.reduce(
                  (sum, item) =>
                    sum +
                    Number(
                      item.qty ??
                        item.quantity ??
                        1
                    ),
                  0
                )}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 3,
              }}
            >
              <Typography fontWeight="bold">
                Total Harga
              </Typography>

              <Typography
                fontWeight="bold"
                color="success.main"
              >
                Rp{" "}
                {total.toLocaleString(
                  "id-ID"
                )}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              onClick={handleCheckout}
              disabled={
                checkoutLoading ||
                cart.length === 0
              }
            >
              {checkoutLoading
                ? "Memproses..."
                : "CHECKOUT"}
            </Button>
          </Paper>
        </Box>
      )}

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

export default Cart;