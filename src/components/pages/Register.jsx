import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Join us today and get started
        </p>

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

        <input
          type="email"
          placeholder="Email"
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

        <button
          style={styles.button}
          onClick={() => navigate("/login")}
        >
          Create Account
        </button>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Sign in here
          </span>
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
    background: "var(--page-bg)",
    color: "var(--text-primary)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "390px",
    maxWidth: "100%",
    padding: "35px",
    background: "var(--surface)",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  title: {
    margin: 0,
    color: "var(--text-primary)",
  },

  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "13px",
    marginBottom: "28px",
  },

  input: {
    width: "100%",
    height: "48px",
    padding: "0 12px",
    marginBottom: "16px",
    border: "1px solid var(--border-color)",
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
    border: "1px solid var(--border-color)",
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
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    height: "45px",
    marginTop: "10px",
    border: "none",
    borderRadius: "9px",
    background:
      "linear-gradient(90deg, #369fc1, #76a699)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },

  loginText: {
    color: "var(--text-secondary)",
    fontSize: "13px",
    marginTop: "22px",
  },

  link: {
    color: "#3596b5",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default RegisterPage;