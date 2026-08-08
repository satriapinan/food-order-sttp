import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Selamat Datang</h1>
        <p style={styles.subtitle}>silakan masuk ke akun Anda</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={styles.toggle}
            >
              {showPassword ? "SEMBUNYIKAN" : "LIHAT"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Masuk Sekarang
          </button>
        </form>

        <p style={styles.footerText}>
          Belum punya akun? <span style={styles.link}>Buat Akun Baru</span>
        </p>
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  
    background: "linear-gradient(135deg, #06b6d4, #10b981)", 
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)", 
    backdropFilter: "blur(10px)",
    padding: "48px 36px",
    borderRadius: "24px", 
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    width: "340px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#0f172a",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: "32px",
    fontSize: "14px",
    color: "#64748b",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "16px",
    backgroundColor: "#f8fafc", 
    border: "2px solid transparent", 
    borderRadius: "12px",
    fontSize: "15px",
    color: "#334155",
    boxSizing: "border-box",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "30px",
  },
  passwordInput: {
    width: "100%",
    padding: "14px 70px 14px 16px", 
    backgroundColor: "#f8fafc",
    border: "2px solid transparent",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#334155",
    boxSizing: "border-box",
    outline: "none",
  },
  toggle: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "11px",
    fontWeight: "700",
    color: "#0ea5e9", 
    cursor: "pointer",
    letterSpacing: "0.5px",
    userSelect: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(to right, #0ea5e9, #10b981)", 
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)", 
  },
  footerText: {
    marginTop: "28px",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#10b981", 
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default App;