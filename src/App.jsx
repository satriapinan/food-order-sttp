import { Routes, Route } from "react-router";
import ExamplePage from "./pages/Example";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MenuPage from "./pages/Menu";

function App() {
  return(
<Routes>
  <Route index element={<ExamplePage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="register" element={<RegisterPage />} />
  <Route path="menu" element={<MenuPage />} />
  <Route path="example" element={<ExamplePage />} />
  <Route path="example/:value" element={<ExamplePage />} />
</Routes>
  );
}
export default App;
