const Register = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "16px",
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "8px", color: "#1e3a8a", textAlign: "center" }}>
          Register
        </h2>
        <p style={{ marginBottom: "20px", color: "#64748b", textAlign: "center" }}>
          Buat akun baru Anda
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
  );
};

export default Register;
