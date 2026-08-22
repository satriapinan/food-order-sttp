import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import AppLayout from "./components/AppLayout";
import "./App.css";

function App() {
  return (
    <AppLayout>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/menu"
          element={<FoodMenu />}
        />
      </Routes>
    </AppLayout>
  );
}

export default App;