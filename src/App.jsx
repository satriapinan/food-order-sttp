import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodMenu from "./pages/foodmenu";
import { ThemeProvider } from "./providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Halaman utama otomatis mengarah ke /menu */}
        <Route path="/" element={<Navigate to="/menu" replace />} />
        
        {/* Route Halaman Food Menu */}
        <Route path="/menu" element={<FoodMenu />} />
        
        {/* Route Halaman Login & Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Jika akses route sembarangan, balikkan ke /menu */}
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </ThemeProvider>
  );
}