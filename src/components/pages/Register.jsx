import { useState } from "react";

function App() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Create Account</h1>
        <p style={styles.subtitle}>Join us today and get started</p>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Full Name"
          style={styles.input}
        />

        <div style={styles.passwordBox}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            style={styles.passwordInput}
          />
          <span
            style={styles.eye}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "◉" : "◌"}
          </span>
        </div>

        <div style={styles.passwordBox}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            style={styles.passwordInput}
          />
          <span
            style={styles.eye}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "◉" : "◌"}
          </span>
        </div>

        <button style={styles.button}>
          Create Account
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.link}>Sign in here</span>
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
    background: "linear-gradient(120deg, #3c9fc0, #78a69d)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "390px",
    padding: "35px",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  h1: {
    margin: 0,
  },

  subtitle: {
    color: "#777",
    fontSize: "13px",
    marginBottom: "28px",
  },

  input: {
    width: "100%",
    height: "48px",
    padding: "0 12px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
  },

  passwordBox: {
    width: "100%",
    height: "48px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    padding: "0 12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
  },

  eye: {
    padding: "0 12px",
    color: "#777",
    cursor: "pointer",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    height: "45px",
    marginTop: "10px",
    border: "none",
    borderRadius: "9px",
    background: "linear-gradient(90deg, #369fc1, #76a699)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },

  loginText: {
    color: "#777",
    fontSize: "13px",
    marginTop: "22px",
  },

  link: {
    color: "#3596b5",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;