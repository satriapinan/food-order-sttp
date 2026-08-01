import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="login-card">
        <h1>Food-Order</h1>
        <p>Login ke dalam sistem</p>

        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="Masukkan username" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Masukkan password" />
        </div>

        <button>LOGIN</button>
      </div>
    </div>
  );
}

export default App;