import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/login";
import ExamplePages from "./pages/example";
import RegisterPage from "./pages/register";
import FoodMenu from "./pages/foodmenu";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="example" element={<ExamplePages />} />
        <Route path="Example/:value" element={<ExamplePages />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="foodmenu" element={<FoodMenu />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
