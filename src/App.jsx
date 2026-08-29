import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";
import NotFoundPage from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="food-order" element={<FoodOrderPage />} />
        </Route>
        <Route path="example" element={<ExamplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
