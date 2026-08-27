import { useState, useContext } from "react";
import { useTheme } from "../Hooks/useTheme";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Providers/CartContext";
import AppSnackbar, { useSnackbar } from "./AppSnackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cartItems, cartCount, cartTotal, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const isDark = mode === "dark";
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    showSnackbar("Berhasil Dipesan! Makanan Anda sedang diproses.");
    clearCart();
    setTimeout(() => {
      setIsCartOpen(false);
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('Rp', 'Rp. ');
  };

  const username = user?.username || user?.data?.username || user?.user?.username || "User";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
        transition: "background-color 0.3s ease",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "12px 24px",
          gap: 2,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: isDark ? "rgba(18, 18, 18, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: isDark ? "#333" : "#eee"
        }}
      >
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, borderRight: "1px solid #ccc", pr: 2 }}>
            <IconButton onClick={() => setIsCartOpen(true)} color="inherit">
              <Badge badgeContent={cartCount} color="error">
                🛒
              </Badge>
            </IconButton>
            
            <Typography variant="body2" sx={{ fontWeight: "bold", display: { xs: 'none', sm: 'block' } }}>
              Halo, {username}
            </Typography>
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="error"
              size="small"
              sx={{ textTransform: "none", borderRadius: "6px" }}
            >
              Logout
            </Button>
          </Box>
        )}

        <Button
          onClick={toggleTheme}
          variant="text"
          size="small"
          sx={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            color: isDark ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDark ? "#3a3a3a" : "#eee",
            },
          }}
        >
          {isDark ? "Light" : "Dark"}
        </Button>
      </Box>

      <Box>{children}</Box>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            backgroundColor: isDark ? "#1e1e1e" : "#fff",
            color: isDark ? "#fff" : "#000",
            p: 3
          }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          Keranjang Belanja 🛒
        </Typography>
        <Divider sx={{ mb: 2, borderColor: isDark ? "#333" : "#eee" }} />

        {cartItems.length === 0 ? (
          <Typography sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}>
            Keranjang Anda masih kosong.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <ListItem key={item.food.id} sx={{ px: 0, py: 1.5, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <img 
                    src={item.food.image || `/images/${item.food.name}.jpg`} 
                    alt={item.food.name} 
                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{item.food.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                      {formatPrice(item.food.price)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                      <Button size="small" variant="outlined" onClick={() => updateQuantity(item.food.id, item.quantity - 1)} sx={{ minWidth: '30px', p: 0 }}>-</Button>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <Button size="small" variant="outlined" onClick={() => updateQuantity(item.food.id, item.quantity + 1)} sx={{ minWidth: '30px', p: 0 }}>+</Button>
                      <Button size="small" color="error" onClick={() => removeFromCart(item.food.id)} sx={{ ml: 'auto', textTransform: 'none' }}>Hapus</Button>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Divider sx={{ mb: 2, borderColor: isDark ? "#333" : "#eee" }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FF6B6B' }}>
                  {formatPrice(cartTotal)}
                </Typography>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={handleCheckout}
                sx={{ 
                  py: 1.5, 
                  background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)', 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: '12px'
                }}
              >
                Checkout Sekarang
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
};

export default AppLayout;