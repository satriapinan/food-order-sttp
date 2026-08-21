import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ExamplePage from "./pages/Example.jsx";
import MenuPage from "./pages/Menu.jsx"; // <-- Tambahkan baris ini

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="menu" element={<MenuPage />} />{" "}
      {/* <-- Tambahkan baris ini */}
    </Routes>
  );
}

export default App;
