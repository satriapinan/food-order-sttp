import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/register";
import ExamplePage from "./pages/Example";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="example" element={<ExamplePage />} />
    </Routes>
  );
}

export default App;