import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/login";
import ExamplePage from "./pages/example";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="beranda" element={<DashboardPage />} />
        <Route path="food-order" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/login/:value" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="example" element={<ExamplePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;