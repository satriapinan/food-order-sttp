import { Routes, Route } from "react-router";
import LoginPage from "./pages/login";
import ExamplePages from "./pages/example";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="example" element={<ExamplePages />} />
      <Route path="Example/:value" element={<ExamplePages />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
