import { useEffect, useState } from "react";
import AppButton from "../components/AppButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, NavLink, useNavigate } from "react-router-dom";

const styles = {
  buttonA: {
    width: "100%",
    backgroundColor: "#1976d2",
    borderRadius: "5px",
    border: "1px solid #FFF",
    color: "#FFF",
    padding: "10px",
  },
  buttonB: {
    width: "100%",
    backgroundColor: "#44d219",
    borderRadius: "5px",
    border: "1px solid #FFF",
    color: "#FFF",
    padding: "10px",
  },
};

function ExamplePage() {
  const show = true;
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const toLogin = () => {
    // window.location.href = "/login";
    navigate("/login");
  };

  useEffect(() => {
    console.log("Count has changed:", count);
  }, [count]);

  if (show) {
    return (
      <Grid container>
        {/* MANUAL */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <button
            onClick={toLogin}
            style={count < 5 ? styles.buttonA : styles.buttonB}
          >
            LOGIN
          </button>
        </Grid>

        {/* MENGGUNAKAN MUI */}

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => setCount((count) => count + 1)}
            sx={{
              width: "100%",
              backgroundColor: { xs: "#FF12", sm: "#FF1213", md: "#FF12AD" },
              color: count < 5 ? "#FFF" : "#f2d600",
              borderRadius: "5px",
              boxShadow: "none",
            }}
          >
            MUI
          </Button>
        </Grid>

        {/* MENGGUNAKAN CUSTOM COMPONENT */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Link to="/login">
            <AppButton>Tambah 2</AppButton>
          </Link>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <NavLink to="/login">Login</NavLink>
        </Grid>

        {/* HASIL */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          {count}
        </Grid>
      </Grid>
    );
  } else {
    return <Typography>Tidak Muncul</Typography>;
  }
}

export default ExamplePage;
