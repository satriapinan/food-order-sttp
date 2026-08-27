import { Routes, Route } from "react-router-dom";
import AppLayout from "./Components/AppLayout";
import LoginPage from "./Pages/login";
import ExamplePage from "./Pages/ExamplePage";
import RegisterPage from "./Pages/register";
import Beranda from "./Pages/Beranda";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="beranda" element={<Beranda />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/login/:value" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="example" element={<ExamplePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
