import AppLayout from "../components/AppLayout";

const Login = ({ onNavigate }) => {
  const navItems = [
    { label: "Home", page: "home" },
    { label: "Menu", page: "menu" },
    { label: "Login", page: "login" },
    { label: "Register", page: "register" },
  ];

  return (
    <AppLayout
      title="Login"
      actions={navItems.map(({ label, page }) => (
        <button
          key={label}
          type="button"
          onClick={() => onNavigate(page)}
          style={{
            border: "none",
            background: page === "login" ? "#2563eb" : "#e0e7ff",
            color: page === "login" ? "white" : "#1e3a8a",
            padding: "10px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          {label}
        </button>
      ))}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "32px",
            borderRadius: "18px",
            background: "white",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.12)",
          }}
        >
          <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
            Selamat Datang Kembali
          </h2>
          <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
            Silakan masuk dengan akun Anda
          </p>

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="nama@gmail.com"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "16px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
