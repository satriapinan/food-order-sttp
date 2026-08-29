import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../services/api";
import { useTheme } from "../hooks/useTheme";

function CartPage() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    api
      .get("/food-order/foods/cart")
      .then((res) => {
        setCartItems(res.data.data || []);
        setTotalAmount(res.data.totalAmount || 0);
      })
      .catch(() => {
        setCartItems([]);
        setTotalAmount(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (cartId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/food-order/cart/qty/${cartId}`, { quantity: newQty });
      fetchCart();
    } catch {
      alert("Gagal update jumlah");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await api.delete(`/food-order/cart/${cartId}`);
      fetchCart();
    } catch {
      alert("Gagal menghapus item");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      const cartId = cartItems.map((item) => item.id);
      const res = await api.post("/food-order/cart/checkout", { cartId });
      alert(
        `Checkout berhasil! Total: Rp. ${res.data.order.totalOrder.toLocaleString("id-ID")}`
      );
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || "Checkout gagal, coba lagi.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: { xs: 2, md: 5 },
        maxWidth: 700,
        margin: "0 auto",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#548394" }}>
        Keranjang Saya
      </Typography>

      {loading && <Typography>Memuat keranjang...</Typography>}

      {!loading && cartItems.length === 0 && (
        <Typography sx={{ color: "#888" }}>Keranjang kamu masih kosong.</Typography>
      )}

      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            mb: 2,
            borderRadius: 2,
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
          }}
        >
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold", color: isDark ? "#fff" : "#000" }}>
                {item.foodName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#548394" }}>
                Rp. {item.price.toLocaleString("id-ID")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small" onClick={() => updateQty(item.id, item.quantity - 1)}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ color: isDark ? "#fff" : "#000" }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => updateQty(item.id, item.quantity + 1)}>
                <AddIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => removeItem(item.id)}
                sx={{ color: "#e53935", ml: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      {cartItems.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#548394" }}>
              Rp. {totalAmount.toLocaleString("id-ID")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            sx={{ backgroundColor: "#1976d2" }}
          >
            Checkout
          </Button>
        </>
      )}

      <Button sx={{ mt: 2, color: isDark ? "#ccc" : "#555" }} onClick={() => navigate("/food-order")}>
        &larr; Kembali ke Menu
      </Button>
    </Box>
  );
}

export default CartPage;