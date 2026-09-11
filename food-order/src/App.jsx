import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import MainMenu from "./pages/MainMenu";
import Login from "./pages/login";
import Register from "./pages/register";
import FoodMenu from "./pages/FoodMenu";
import { useAuth } from "./components/hooks/useAuth";

const routeMap = {
  home: "/",
  menu: "/menu",
  login: "/login",
  register: "/register",
  profile: "/profile",
};

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 50%, #f8fafc 100%)",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "460px",
            width: "100%",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "22px",
            padding: "32px",
            boxShadow: "0 18px 40px rgba(37,99,235,0.14)",
            textAlign: "center",
            color: "#0f172a",
          }}
        >
          <div style={{ fontSize: "54px", marginBottom: "12px" }}>🔒</div>
          <h2 style={{ margin: "0 0 12px" }}>Profil</h2>
          <p style={{ margin: "0 0 22px", color: "#475569", lineHeight: 1.6 }}>
            Anda belum login. Silakan masuk terlebih dahulu untuk melihat data profil Anda.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            Ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #2563eb 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: "28px",
          padding: "28px",
          boxShadow: "0 22px 50px rgba(15, 23, 42, 0.28)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "26px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #facc15, #f97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p style={{ margin: 0, color: "#dbeafe", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Profil Pengguna
            </p>
            <h2 style={{ margin: "8px 0 0", fontSize: "32px" }}>{user.username}</h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: "16px",
            background: "rgba(15, 23, 42, 0.25)",
            borderRadius: "20px",
            padding: "22px",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ color: "#bfdbfe" }}>Username</span>
            <strong>{user.username}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ color: "#bfdbfe" }}>Nama Lengkap</span>
            <strong>{user.fullName}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <span style={{ color: "#bfdbfe" }}>Email</span>
            <strong>{user.email}</strong>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "26px", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => navigate("/menu")}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#e0e7ff",
              color: "#1e3a8a",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Kembali ke Menu
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

function AppRoutes() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (typeof page === "string") {
      const target = routeMap[page] || "/";
      navigate(target);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<MainMenu onNavigate={handleNavigate} />} />
      <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
      <Route path="/register" element={<Register onNavigate={handleNavigate} />} />
      <Route path="/menu" element={<FoodMenu onNavigate={handleNavigate} />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
