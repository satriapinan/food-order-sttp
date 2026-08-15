const MainMenu = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "20px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
          padding: "30px",
          color: "white",
        }}
      >
        <h1 style={{ margin: "0 0 12px", textAlign: "center", fontSize: "36px" }}>
          Menu Utama
        </h1>
        <p style={{ textAlign: "center", marginBottom: "30px", color: "#dbeafe" }}>
          Pilih menu yang ingin Anda buka
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          <button
            style={{
              padding: "20px 16px",
              borderRadius: "14px",
              border: "none",
              background: "#ffffff",
              color: "#1e3a8a",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Home
          </button>

          <button
            style={{
              padding: "20px 16px",
              borderRadius: "14px",
              border: "none",
              background: "#dbeafe",
              color: "#1e3a8a",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Profile
          </button>

          <button
            style={{
              padding: "20px 16px",
              borderRadius: "14px",
              border: "none",
              background: "#bfdbfe",
              color: "#1e3a8a",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Orders
          </button>

          <button
            style={{
              padding: "20px 16px",
              borderRadius: "14px",
              border: "none",
              background: "#93c5fd",
              color: "#0f172a",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
