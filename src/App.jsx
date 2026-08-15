import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ExamplePage from "./pages/Example";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;