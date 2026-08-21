import { Routes, Route } from "react-router-dom";
import AppLayout from "./commponents/AppLayout";
import BerandaPage from "./pages/Beranda";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<BerandaPage />} />
        <Route path="home" element={<BerandaPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="food-order" element={<FoodOrderPage />} />
        <Route path="example" element={<ExamplePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;