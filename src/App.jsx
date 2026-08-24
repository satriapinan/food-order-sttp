import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import Cart from "./pages/Cart";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

import "./App.css";

function App() {
  return (
    <AppLayout>
      <Routes>

        {/* =========================
            DEFAULT
        ========================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* =========================
            PUBLIC
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            PROTECTED
        ========================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/menu"
            element={<FoodMenu />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

        </Route>

        {/* =========================
            404
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </AppLayout>
  );
}

export default App;