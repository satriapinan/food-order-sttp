import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FoodMenuPage from "./pages/FoodMenu";
import ExamplePage from "./pages/example";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<FoodMenuPage />} />
        <Route path="food-menu" element={<FoodMenuPage />} />
        <Route path="food-order" element={<FoodMenuPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="example" element={<ExamplePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;