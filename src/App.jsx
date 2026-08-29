import { Routes, Route } from "react-router";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MenuPage from "./pages/Menu";
import AppLayout from "./components/AppLayout";

function App() {
  return(
<AppLayout>
<Routes>
  <Route index element={<LoginPage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="register" element={<RegisterPage />} />
  <Route path="menu" element={<MenuPage />} />
</Routes>
</AppLayout>
  );
}
export default App;
