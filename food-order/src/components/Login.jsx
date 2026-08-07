import { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Isi username dan password.");
      return;
    }
    setError("");
    if (onSubmit) onSubmit({ username: username.trim(), password });
  };

  return (
    <div className="login-card">
      <div className="card-decor" aria-hidden />
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-title">Login</h3>
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <button className="app-button" type="submit">
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
