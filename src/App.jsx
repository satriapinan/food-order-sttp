import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider"; // 1. Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          {/* Halaman Auth tanpa AppLayout utama */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Halaman Main/Dashboard menggunakan AppLayout */}
          <Route
            path="/menu"
            element={
              <AppLayout>
                <FoodOrderPage />
              </AppLayout>
            }
          />
          <Route
            path="/example"
            element={
              <AppLayout>
                <ExamplePage />
              </AppLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;