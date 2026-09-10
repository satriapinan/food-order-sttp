import { Navigate, Routes, Route } from "react-router-dom";
import AppLayout from "./commponents/AppLayout";
import { useAuth } from "./hooks/useAuth";
import BerandaPage from "./pages/Beranda";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";
import KeranjangPage from "./pages/KeranjangPage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route index element={<ProtectedRoute><BerandaPage /></ProtectedRoute>} />
        <Route path="home" element={<ProtectedRoute><BerandaPage /></ProtectedRoute>} />
        <Route path="food-order" element={<ProtectedRoute><FoodOrderPage /></ProtectedRoute>} />
        <Route path="keranjang" element={<ProtectedRoute><KeranjangPage /></ProtectedRoute>} />
        <Route path="example" element={<ProtectedRoute><ExamplePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;