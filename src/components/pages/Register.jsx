import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useAuth } from "../../assets/hooks/useAuth";

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username minimal 3 karakter")
    .required("Username harus diisi"),
  fullName: Yup.string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .required("Nama lengkap harus diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      login({
        username: values.username,
        fullName: values.fullName,
        email: values.email,
      });

      navigate("/food-order");
    },
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>Join us today and get started</p>

        <form onSubmit={formik.handleSubmit} noValidate>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.username && formik.errors.username ? (
            <div style={styles.errorText}>{formik.errors.username}</div>
          ) : null}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div style={styles.errorText}>{formik.errors.fullName}</div>
          ) : null}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={styles.errorText}>{formik.errors.email}</div>
          ) : null}

          <div style={styles.passwordBox}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={styles.passwordInput}
            />

            <span style={styles.eye} onClick={() => setShowPass(!showPass)}>
              {showPass ? "◉" : "◌"}
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div style={styles.errorText}>{formik.errors.password}</div>
          ) : null}

          <div style={styles.passwordBox}>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={styles.passwordInput}
            />

            <span style={styles.eye} onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "◉" : "◌"}
            </span>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div style={styles.errorText}>{formik.errors.confirmPassword}</div>
          ) : null}

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account? {" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--page-bg)",
    color: "var(--text-primary)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "390px",
    maxWidth: "100%",
    padding: "35px",
    background: "var(--surface)",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  title: {
    margin: 0,
    color: "var(--text-primary)",
  },

  subtitle: {
    color: "var(--text-secondary)",
    fontSize: "13px",
    marginBottom: "28px",
  },

  input: {
    width: "100%",
    height: "48px",
    padding: "0 12px",
    marginBottom: "10px",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    background: "transparent",
    color: "var(--text-primary)",
  },

  passwordBox: {
    width: "100%",
    height: "48px",
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    marginBottom: "10px",
    boxSizing: "border-box",
    background: "transparent",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    padding: "0 12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    color: "var(--text-primary)",
  },

  eye: {
    padding: "0 12px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    height: "45px",
    marginTop: "10px",
    border: "none",
    borderRadius: "9px",
    background: "linear-gradient(90deg, #369fc1, #76a699)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },

  loginText: {
    color: "var(--text-secondary)",
    fontSize: "13px",
    marginTop: "22px",
  },

  link: {
    color: "#3596b5",
    fontWeight: "bold",
    cursor: "pointer",
  },

  errorText: {
    color: "#d92d20",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: "10px",
    marginTop: "-4px",
  },
};

export default RegisterPage;