import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

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
    marginBottom: "5px", // dikecilin dari 15px biar ada ruang buat teks error
    boxSizing: "border-box",
    border: "1px solid #d8dee8",
    borderRadius: "8px",
    fontSize: "14px",
  },
  error: {
    // buat nampilin pesan error validasi di bawah input
    color: "red",
    fontSize: "12px",
    marginTop: 0,
    marginBottom: "10px",
  },
};

// aturan validasi form register
const registerSchema = Yup.object({
  username: Yup.string().required("Username harus diisi"),
  fullName: Yup.string().required("Nama lengkap harus diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password harus diisi"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak cocok")
    .required("Konfirmasi password harus diisi"),
});

function RegisterPage() {
  const navigate = useNavigate();

  // formik ngatur semua state form (value, error, touched) sekaligus
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      confirm: "",
    },
    validationSchema: registerSchema, // divalidasi pakai schema di atas
    onSubmit: (values) => {
      console.log(values); // cek data yang diinput user
      alert("Account created successfully!");
      navigate("/login");
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

        {/* pakai formik.handleSubmit, bukan handleSubmit manual lagi */}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username" // name wajib ada biar formik tau ini field apa
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // buat nandain field ini udah pernah diklik/diisi
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
          {/* validasi cocok/nggaknya password sekarang dicek yup, bukan manual di handleSubmit */}
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