import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e5f66, #3d8f95, #5fada0)",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    width: "320px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "5px",
    boxSizing: "border-box",
    border: "1px solid #d8dee8",
    borderRadius: "8px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: 0,
    marginBottom: "10px",
  },
};

const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .max(8, "Password maksimal 8 karakter")
    .required("Password harus diisi"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirm: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/user-management/users/sign-up", {
          username: values.username,
          fullname: values.fullName,
          password: values.password,
          retypePassword: values.confirm,
        });
        alert("Account created successfully!");
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Register gagal, coba lagi.");
      }
    },
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Typography variant="h5" align="center" style={{ color: "#2b6f77" }}>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" style={{ color: "#8a94a6", marginBottom: 20 }}>
          Join us today and get started
        </Typography>

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
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p style={styles.error}>{formik.errors.fullName}</p>
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

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
          />
          {formik.touched.confirm && formik.errors.confirm && (
            <p style={styles.error}>{formik.errors.confirm}</p>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: "linear-gradient(135deg, #2b7f9a, #4a9b7f)", fontWeight: 600, marginTop: "5px" }}
          >
            Create Account
          </Button>
        </form>

        <Typography align="center" style={{ marginTop: 16, fontSize: 13 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#02818f", fontWeight: 600 }}>
            Sign in here
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default RegisterPage;