import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FoodMenuPage from "./pages/FoodMenuPage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:values" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="menu" element={<FoodMenuPage />} />
    </Routes>
  );
}

export default App;