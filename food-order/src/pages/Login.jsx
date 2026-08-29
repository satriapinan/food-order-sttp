import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

const loginSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .max(8, "Password maksimal 8 karakter")
    .required("Password harus diisi"),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/user-management/users/sign-in", values);
        login(res.data);
        navigate("/food-order");
      } catch (err) {
        alert(err.response?.data?.message || "Login gagal, coba lagi.");
      }
    },
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.username && formik.errors.username && (
            <p style={styles.error}>{formik.errors.username}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.password && formik.errors.password && (
            <p style={styles.error}>{formik.errors.password}</p>
          )}

          <button type="submit" style={styles.button}>
            SIGN IN
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Sign up here
          </Link>
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
    marginBottom: "5px",
    boxSizing: "border-box",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: 0,
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#06d6d6",
    color: "#fff",
    border: "none",
    marginTop: "5px",
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
    textDecoration: "none",
  },
};

export default LoginPage;