```jsx
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>

        <div style={styles.info}>
          <div>
            <h1>Let's Get Started!</h1>
            <p>
              Selamat datang kembali. Masuk ke akunmu
              dan lanjutkan perjalananmu hari ini.
            </p>
          </div>
        </div>

        <form onSubmit={login} style={styles.form}>
          <h2>Welcome Back</h2>
          <p style={styles.text}>
            Senang melihatmu kembali 👋
          </p>

          <label>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Masukkan password kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={styles.forgot}>
            Lupa password?
          </div>

          <button style={styles.button} type="submit">
            Masuk Sekarang
          </button>

          <p style={styles.bottom}>
            Belum memiliki akun?{" "}
            <b style={{ color: "#16a34a" }}>
              Buat akun
            </b>
          </p>
        </form>

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
    background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    fontFamily: "Arial, sans-serif",
  },

  box: {
    width: "700px",
    display: "flex",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 12px 35px rgba(22, 101, 52, 0.18)",
  },

  info: {
    width: "40%",
    padding: "45px 30px",
    background: "linear-gradient(160deg, #16a34a, #166534)",
    color: "white",
    display: "flex",
    alignItems: "center",
  },

  form: {
    width: "60%",
    padding: "40px",
  },

  text: {
    color: "#777",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
  },

  forgot: {
    textAlign: "right",
    color: "#16a34a",
    fontSize: "13px",
    cursor: "pointer",
    marginBottom: "18px",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#16a34a",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  bottom: {
    textAlign: "center",
    color: "#777",
    marginTop: "22px",
    fontSize: "14px",
  },
};

export default App;
```
