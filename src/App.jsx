import { Routes, Route } from "react-router";
import AppLayout from "./components/AppLayout";
import LoginPages from "./pages/login";
import ExamplePage from "./pages/example";
import RegisterPages from "./pages/register";
import MenuPages from "./pages/MenuPages";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPages />} />
        <Route path="login" element={<LoginPages />} />
        <Route path="example" element={<ExamplePage />} />
        <Route path="register" element={<RegisterPages />} />
        <Route path="menu" element={<MenuPages />} />
      </Routes>
    </AppLayout>
  );
}

export default App;