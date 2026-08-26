import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FoodMenu from "./pages/foodmenu";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/foodmenu" element={<FoodMenu />} />
        </Route>

        <Route path="/" element={<Navigate to="/foodmenu" replace />} />
        <Route path="*" element={<Navigate to="/foodmenu" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
