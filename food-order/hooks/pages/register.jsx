import AppLayout from "../components/AppLayout";

const Register = ({ onNavigate }) => {
  const navItems = [
    { label: "Home", page: "home" },
    { label: "Menu", page: "menu" },
    { label: "Login", page: "login" },
    { label: "Register", page: "register" },
  ];

  return (
    <AppLayout
      title="Register"
      actions={navItems.map(({ label, page }) => (
        <button
          key={label}
          type="button"
          onClick={() => onNavigate(page)}
          style={{
            border: "none",
            background: page === "register" ? "#2563eb" : "#e0e7ff",
            color: page === "register" ? "white" : "#1e3a8a",
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
            maxWidth: "460px",
            padding: "32px",
            borderRadius: "18px",
            background: "white",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.12)",
          }}
        >
          <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
            Buat Akun Baru
          </h2>
          <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
            Isi data diri Anda di bawah ini
          </p>

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Masukkan username"
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
            Full Name
          </label>
          <input
            type="text"
            placeholder="Masukkan full name"
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
              marginBottom: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Konfirmasi password"
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
            Register
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;
