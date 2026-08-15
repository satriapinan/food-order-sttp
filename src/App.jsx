import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="food-order" element={<FoodOrderPage />} />
        <Route path="example" element={<ExamplePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;