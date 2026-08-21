import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FoodOrderPage from "./pages/FoodOrder";
import ExamplePage from "./pages/Example";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<FoodOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<FoodOrderPage />} />
          <Route path="/example" element={<ExamplePage />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;