import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import MenuPage from "./pages/Menu.jsx";

function App() {
  return (
    <Routes>
      {/* Jika user membuka halaman utama (/), langsung arahkan ke login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  );
}

export default App;
