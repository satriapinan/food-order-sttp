import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <style>{`
        .login-button {
          width: 100%;
          display: block;
          padding: 14px;
          margin-top: 5px;

          border-radius: 10px;
          border: none;

          background: #22c55e;
          color: white;

          text-align: center;
          text-decoration: none;

          font-size: 16px;
          font-weight: bold;

          transition: 0.3s;
          box-sizing: border-box;
          cursor: pointer;
        }

        .login-button:hover {
          background: #16a34a;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="container">
        <div className="login-card">
          <h1>Food Order</h1>

          <p>Login ke Dalam Sistem</p>

          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
              />
            </div>

            <Link to="/menu" className="login-button">
              LOGIN
            </Link>
          </form>

          <div className="register-link">
            Belum punya akun?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;