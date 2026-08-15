import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ExamplePage from "./pages/Example";
import RegisterPage from "./pages/register";
import MasukPage from "./pages/masuk";
import BerandaPage from "./pages/beranda";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/:value" element={<LoginPage />} />
      <Route path="example" element={<ExamplePage />} />
      <Route path="register" element ={<RegisterPage />} />
      <Route path="masuk" element ={<MasukPage />} />
      <Route path="beranda" element ={<BerandaPage />} />
    </Routes>
    </AppLayout>
  );
}

export default App;