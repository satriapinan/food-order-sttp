import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

import LoginPage from "./components/pages/Login";
import RegisterPage from "./components/pages/Register";
import MenuPage from "./components/pages/MenuPage";
import CartPage from "./components/pages/CartPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />

        <Route path="login" element={<LoginPage />} />

        <Route path="register" element={<RegisterPage />} />

        <Route path="food-order" element={<MenuPage />} />

        <Route path="cart" element={<CartPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;