import { Routes, Route } from "react-router-dom";
import loginPage from "./components/pages/login";
import ExamplePage from "./components/pages/Example";
import RegisterPage from "./components/pages/register";

function App() {
  return (
    <Routes>
      <Route index element={<ExamplePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="example" element={<ExamplePage />} />
    </Routes>
  );
}

export default App;