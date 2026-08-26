import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodMenu from "./pages/foodmenu"
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppLayout>
          <Routes>
            {/* Halaman utama mengarah ke /menu */}
            <Route path="/" element={<Navigate to="/menu" replace />} />
            
            {/* Route Halaman Utama & Auth */}
            <Route path="/menu" element={<FoodMenu />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Redirect route yang tidak valid */}
            <Route path="*" element={<Navigate to="/menu" replace />} />
          </Routes>
        </AppLayout>
      </ThemeProvider>
    </AuthProvider>
  );
}