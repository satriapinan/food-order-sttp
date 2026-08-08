import { Routes, Route } from "react-router";
import LoginPage from "./pages/Login";
import ExamplePage from "./pages/Example";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<Login />} />
      <Route path="example" element={<Example />} />
    </Routes>
  );
}

export default App;
