import { Routes, Route } from "react-router";
import LoginPages from "./pages/login";
import ExamplePage from "./pages/example";
import RegisterPages from "./pages/register";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPages />} />
      <Route path="login" element={<LoginPages />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="register" element={<RegisterPages />} />
    </Routes>
  );
}

export default App;