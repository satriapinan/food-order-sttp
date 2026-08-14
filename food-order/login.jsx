const Login = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "380px",
        padding: "32px",
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
          Ini Tampilan Login
        </h2>
        <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
          Silakan masuk dengan akun Anda
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
            boxSizing: "border-box"
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
            boxSizing: "border-box"
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
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
