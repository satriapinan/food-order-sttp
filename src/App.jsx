import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="menu" element={<FoodMenu />} />
      </Routes>
    </AppLayout>
  );
}

export default App;