import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ExamplePage from "./pages/Example";
import RegisterPage from "./pages/Register";
import FoodMenuPage from "./pages/FoodMenu";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="food-menu" element={<FoodMenuPage />} />
    </Routes>
  );
}

export default App;