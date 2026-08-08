import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e5f66, #3d8f95, #5fada0)",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    width: "320px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    boxSizing: "border-box",
    border: "1px solid #d8dee8",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Typography variant="h5" align="center" style={{ color: "#2b6f77" }}>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" style={{ color: "#8a94a6", marginBottom: 20 }}>
          Join us today and get started
        </Typography>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={styles.input}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: "linear-gradient(135deg, #2b7f9a, #4a9b7f)", fontWeight: 600 }}
          >
            Create Account
          </Button>
        </form>

        <Typography align="center" style={{ marginTop: 16, fontSize: 13 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#02818f", fontWeight: 600 }}>
            Sign in here
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default RegisterPage;