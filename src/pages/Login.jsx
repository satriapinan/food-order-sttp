import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";

const loginSchema = Yup.object({
  username: Yup.string()
    .required("Username harus diisi"),

  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mode } = useTheme();

  const isDark = mode === "dark";

  const formik = useFormik({
    initialValues: {
  username: "",
  password: "",
},

    validationSchema: loginSchema,

    onSubmit: async (values) => {
  try {
    await login({
      username: values.username,
      password: values.password,
    });

    navigate("/menu");
  } catch (error) {
    alert(error.message);
  }
},
  });

  return (
    <>
      <style>{`
        .login-container {
          width: 100%;
          min-height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }

        /* =========================
           DARK MODE
        ========================= */

        .login-container.dark {
          background-color: #06140c;
          color: #ffffff;
        }

        /* =========================
           LIGHT MODE
        ========================= */

        .login-container.light {
          background-color: #f5f5f5;
          color: #111111;
        }

        /* =========================
           LOGIN CARD
        ========================= */

        .login-card {
          width: 400px;
          padding: 40px;

          border-radius: 18px;

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease;
        }

        /* DARK CARD */

        .login-container.dark .login-card {
          background-color: #151515;
          border: 1px solid #22c55e;
        }

        /* LIGHT CARD */

        .login-container.light .login-card {
          background-color: #ffffff;
          border: 1px solid #dddddd;
        }

        /* =========================
           TITLE
        ========================= */

        .login-card h1 {
          margin: 0 0 8px 0;

          color: #22c55e;

          font-size: 32px;
          font-weight: 700;
        }

        /* =========================
           DESCRIPTION
        ========================= */

        .login-container.dark .login-card p {
          color: #aaaaaa;
        }

        .login-container.light .login-card p {
          color: #666666;
        }

        .login-card p {
          margin-top: 0;
          margin-bottom: 28px;
        }

        /* =========================
           INPUT GROUP
        ========================= */

        .input-group {
          margin-bottom: 18px;
        }

        .input-group label {
          display: block;

          margin-bottom: 8px;

          font-weight: bold;

          color: #22c55e;
        }

        .input-group input {
          width: 100%;

          padding: 12px;

          box-sizing: border-box;

          border-radius: 8px;

          outline: none;

          font-size: 15px;

          transition:
            border-color 0.3s ease,
            background-color 0.3s ease,
            color 0.3s ease;
        }

        /* =========================
           DARK INPUT
        ========================= */

        .login-container.dark .input-group input {
          background-color: #222222;
          color: #ffffff;
          border: 1px solid #444444;
        }

        .login-container.dark .input-group input:focus {
          border-color: #22c55e;
        }

        .login-container.dark .input-group input::placeholder {
          color: #777777;
        }

        /* =========================
           LIGHT INPUT
        ========================= */

        .login-container.light .input-group input {
          background-color: #ffffff;
          color: #111111;
          border: 1px solid #cccccc;
        }

        .login-container.light .input-group input:focus {
          border-color: #22c55e;
        }

        .login-container.light .input-group input::placeholder {
          color: #888888;
        }

        /* =========================
           ERROR
        ========================= */

        .input-error {
          margin-top: 6px;

          font-size: 13px;

          color: #ef4444;
        }

        /* =========================
           LOGIN BUTTON
        ========================= */

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

        /* =========================
           REGISTER
        ========================= */

        .register-link {
          margin-top: 20px;

          text-align: center;
        }

        .login-container.dark .register-link {
          color: #aaaaaa;
        }

        .login-container.light .register-link {
          color: #666666;
        }

        .register-link a {
          color: #22c55e;

          font-weight: bold;

          text-decoration: none;
        }

        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className={`login-container ${isDark ? "dark" : "light"}`}>
        <div className="login-card">

          <h1>Food Order</h1>

          <p>Login ke Dalam Sistem</p>

          <form onSubmit={formik.handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">
             <label htmlFor="username">
  Username
</label>

<input
  id="username"
  name="username"
  type="text"
  placeholder="Masukkan username"
  value={formik.values.username}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>

{formik.touched.username && formik.errors.username && (
  <div className="input-error">
    {formik.errors.username}
  </div>
)}
            </div>

            {/* PASSWORD */}

            <div className="input-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password && (
                <div className="input-error">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* LOGIN */}

            <button
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

          </form>

          {/* REGISTER */}

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