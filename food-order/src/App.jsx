import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ExamplePage from "./pages/Example";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;