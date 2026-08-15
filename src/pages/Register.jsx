import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useFormik } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Nama minimal 3 karakter")
    .required("Nama harus diisi"),

  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),

  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Konfirmasi password tidak sama"
    )
    .required("Konfirmasi password harus diisi"),
});

function Register() {
  const navigate = useNavigate();

  const { mode } = useTheme();
  const isDark = mode === "dark";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values) => {
      console.log("Data Register:", values);

      // Untuk sementara belum menggunakan database
      navigate("/login");
    },
  });

  return (
    <>
      <style>{`
        .register-container {
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

        .register-container.dark {
          background-color: #06140c;
          color: #ffffff;
        }

        /* =========================
           LIGHT MODE
        ========================= */

        .register-container.light {
          background-color: #f5f5f5;
          color: #111111;
        }

        /* =========================
           REGISTER CARD
        ========================= */

        .register-card {
          width: 400px;
          padding: 40px;

          border-radius: 18px;

          box-sizing: border-box;

          transition:
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease;
        }

        .register-container.dark .register-card {
          background-color: #151515;
          border: 1px solid #22c55e;
        }

        .register-container.light .register-card {
          background-color: #ffffff;
          border: 1px solid #dddddd;
        }

        /* =========================
           TITLE
        ========================= */

        .register-card h1 {
          margin: 0 0 8px 0;

          color: #22c55e;

          font-size: 32px;
          font-weight: 700;
        }

        /* =========================
           DESCRIPTION
        ========================= */

        .register-card p {
          margin-top: 0;
          margin-bottom: 28px;
        }

        .register-container.dark .register-card p {
          color: #aaaaaa;
        }

        .register-container.light .register-card p {
          color: #666666;
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

        .register-container.dark .input-group input {
          background-color: #222222;
          color: #ffffff;
          border: 1px solid #444444;
        }

        .register-container.dark .input-group input:focus {
          border-color: #22c55e;
        }

        .register-container.dark .input-group input::placeholder {
          color: #777777;
        }

        /* =========================
           LIGHT INPUT
        ========================= */

        .register-container.light .input-group input {
          background-color: #ffffff;
          color: #111111;
          border: 1px solid #cccccc;
        }

        .register-container.light .input-group input:focus {
          border-color: #22c55e;
        }

        .register-container.light .input-group input::placeholder {
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
           REGISTER BUTTON
        ========================= */

        .register-button {
          width: 100%;

          display: block;

          padding: 14px;

          margin-top: 5px;

          border-radius: 10px;

          border: none;

          background: #22c55e;

          color: white;

          font-size: 16px;

          font-weight: bold;

          transition: 0.3s;

          box-sizing: border-box;

          cursor: pointer;
        }

        .register-button:hover {
          background: #16a34a;

          transform: translateY(-2px);
        }

        /* =========================
           LOGIN LINK
        ========================= */

        .login-link {
          margin-top: 20px;

          text-align: center;
        }

        .register-container.dark .login-link {
          color: #aaaaaa;
        }

        .register-container.light .login-link {
          color: #666666;
        }

        .login-link a {
          color: #22c55e;

          font-weight: bold;

          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className={`register-container ${isDark ? "dark" : "light"}`}>
        <div className="register-card">

          <h1>Food Order</h1>

          <p>Buat Akun Baru</p>

          <form onSubmit={formik.handleSubmit}>

            {/* name */}

            <div className="input-group">
              <label htmlFor="name">
                Nama Lengkap
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan Nama Lengkap"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.name &&
                formik.errors.name && (
                  <div className="input-error">
                    {formik.errors.name}
                  </div>
                )}
            </div>

            {/* EMAIL */}

            <div className="input-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email &&
                formik.errors.email && (
                  <div className="input-error">
                    {formik.errors.email}
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

              {formik.touched.password &&
                formik.errors.password && (
                  <div className="input-error">
                    {formik.errors.password}
                  </div>
                )}
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="input-group">
              <label htmlFor="confirmPassword">
                Konfirmasi Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Masukkan kembali password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="input-error">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* REGISTER */}

            <button
              type="submit"
              className="register-button"
            >
              REGISTER
            </button>

          </form>

          {/* LOGIN */}

          <div className="login-link">
            Sudah punya akun?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Register;