import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import FoodMenuPage from "./pages/FoodMenuPage";
import Example from "./pages/example";

function App() {
  return (
    <AppLayout>
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:values" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="menu" element={<FoodMenuPage />} />
      <Route path="example" element={<Example />} />
    </Routes>
    </AppLayout>
  );
}

export default App;