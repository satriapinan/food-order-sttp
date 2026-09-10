import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import MasukPage from "./pages/masuk";
import BerandaPage from "./pages/beranda";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
      <Route index element={<MasukPage />} />
      <Route path="masuk" element={<MasukPage />} />
      <Route path="masuk/:value" element={<MasukPage />} />
      <Route path="register" element ={<RegisterPage />} />

      <Route path="beranda" element ={<BerandaPage />} />
    </Routes>
    </AppLayout>
  );
}

export default App;