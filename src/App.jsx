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
        <h1 style={styles.title}>Halo, Selamat Datang</h1>
        <p style={styles.subtitle}>Masuk ke akunmu untuk melanjutkan</p>

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
              {showPassword ? "Sembunyikan" : "Lihat"}
            </span>
          </div>

          <button type="submit" style={styles.button}>
            Masuk
          </button>
        </form>

        <p style={styles.footerText}>
          Belum punya akun? <span style={styles.link}>Daftar di sini</span>
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
    background: "linear-gradient(135deg, #6D5BD0, #8E7CF0)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 32px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "320px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    color: "#2E2A47",
  },
  subtitle: {
    marginTop: "6px",
    marginBottom: "24px",
    fontSize: "13px",
    color: "#8B87A3",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "14px",
    border: "1px solid #E1DEEF",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  passwordInput: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #E1DEEF",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  toggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "11px",
    color: "#6D5BD0",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#6D5BD0",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  footerText: {
    marginTop: "18px",
    fontSize: "13px",
    color: "#8B87A3",
  },
  link: {
    color: "#6D5BD0",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default App;