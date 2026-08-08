import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <div className="login-card">
        <h1>Food-Order</h1>

        <p>Login ke Dalam Sistem</p>

        <form>
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Masukkan username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Masukkan password"
            />
          </div>

          <button type="submit">
            LOGIN
          </button>
        </form>

        <div className="register-link">
          Belum punya akun?{" "}
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;