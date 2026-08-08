import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container">
      <div className="register-card">
        <h1>Food Order</h1>

        <p>Buat Akun Baru</p>

        <form>
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Masukkan username"
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Masukkan email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Masukkan password"
            />
          </div>

          <div className="input-group">
            <label>Konfirmasi Password</label>

            <input
              type="password"
              placeholder="Masukkan kembali password"
            />
          </div>

          <button type="submit">
            REGISTER
          </button>
        </form>

        <div className="login-link">
          Sudah punya akun?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;