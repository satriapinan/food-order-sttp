import { Routes, Route } from "react-router-dom"; 
import AppLayout from "./components/AppLayout";

import LoginPages from "./pages/LoginPages";
import RegisterPages from "./pages/RegisterPages";
import MenuPages from "./pages/MenuPages";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<LoginPages />} />
        
        <Route path="login" element={<LoginPages />} />
        <Route path="register" element={<RegisterPages />} />
        <Route path="menu" element={<MenuPages />} />
      </Routes>
    </AppLayout>
  );
}

export default App;