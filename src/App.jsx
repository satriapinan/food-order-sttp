import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodMenuPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="food-menu" element={<FoodOrderPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
