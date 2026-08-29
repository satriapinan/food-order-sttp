import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FoodMenuPage from "./pages/FoodMenuPage";
import Example from "./pages/example";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="login/:values" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected Route */}
        <Route
          path="menu"
          element={
            <ProtectedRoute>
              <FoodMenuPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="example" element={<Example />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;