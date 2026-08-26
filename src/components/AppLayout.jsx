import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fungsi Logout dipindah ke sini!
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: isDark ? "#121212" : "#f9f9f9", color: isDark ? "#fff" : "#000", transition: "all 0.3s" }}>
      
      {/* NAVBAR ATAS (HEADER) */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "15px 30px",
        bgcolor: isDark ? "#1e1e1e" : "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        
        {/* LOGO & SAPAAN */}
        <Typography variant="h6" sx={{ fontWeight: "900", letterSpacing: "1px", color: "#E05D36" }}>
          {user ? `Hi, ${user.fullname || user.username} 👋` : "Ariyummy 🍕"}
        </Typography>

        {/* TOMBOL KANAN (TEMA & LOGOUT) */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button onClick={toggleTheme} sx={{ 
            borderRadius: "20px", px: 2, fontWeight: "bold",
            bgcolor: isDark ? "#333" : "#f0f0f0", color: isDark ? "#fff" : "#333" 
          }}>
            {isDark ? "🌞 Light" : "🌙 Dark"}
          </Button>
          
          {/* Tombol Logout HANYA muncul kalau user sudah login */}
          {user && (
            <Button onClick={handleLogout} sx={{ 
              borderRadius: "20px", px: 3, fontWeight: "bold",
              bgcolor: "#ffebee", color: "#d32f2f", 
              "&:hover": { bgcolor: "#ffcdd2" } 
            }}>
              Logout
            </Button>
          )}
        </Box>
      </Box>

      {/* KONTEN HALAMAN */}
      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;