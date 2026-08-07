function App() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
        />

        <button style={styles.button}>SIGN IN</button>

        <p style={styles.footer}>
          Don't have an account? <span style={styles.link}>Sign up here</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "30px",
    width: "320px",
  },
  title: {
    textAlign: "center",
    marginBottom: "4px",
  },
  subtitle: {
    textAlign: "center",
    color: "#888",
    fontSize: "13px",
    marginTop: 0,
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#06d6d6",
    color: "#fff",
    border: "none",
  },
  footer: {
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
    marginTop: "15px",
    marginBottom: 0,
  },
  link: {
    color: "#06d6d6",
    fontWeight: "bold",
  },
};

export default App;