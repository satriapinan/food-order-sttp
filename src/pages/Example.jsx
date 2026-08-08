import { useState } from "react";
import { useNavigate } from "react-router";
import AppButton from "../components/AppButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const styles = {
  buttonA: {
    width: "100%",
    backgroundColor: "#1976d2",
    borderRadius: "5px",
    border: "1px solid #fff",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
  },

  buttonB: {
    width: "100%",
    backgroundColor: "#44d219",
    borderRadius: "5px",
    border: "1px solid #fff",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
  },
};

function ExamplePage() {
  const show = true;
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <Grid container spacing={2}>
      {/* MANUAL */}
      {show && (
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <button
            onClick={toLogin}
            style={styles.buttonA}
          >
            LOGIN
          </button>
        </Grid>
      )}

      {/* MENGGUNAKAN MUI */}
      {count > 1 && (
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => setCount((count) => count + 1)}
            sx={{
              width: "100%",
              backgroundColor: {
                xs: "#ff1212",
                sm: "#ff1213",
                md: "#ff12ad",
              },
              borderRadius: "5px",
              boxShadow: "none",
            }}
          >
            MUI
          </Button>
        </Grid>
      )}

      {/* MENGGUNAKAN CUSTOM COMPONENT */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AppButton
          onClick={() => setCount((count) => count + 1)}
        >
          Tambah 1
        </AppButton>

        <AppButton
          onClick={() => setCount((count) => count + 2)}
        >
          Tambah 2
        </AppButton>
      </Grid>

      {/* HASIL */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Typography variant="h5">
          {count}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ExamplePage;