import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../commponents/AppButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const styles = {
  button: {
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
  }
}

function ExamplePage() {
  const show = true;
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const toLoginPage = () => {
    navigate("/login");
  };

  if (show) {
    return (
      <Grid container>
        {/* MANUAL */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <button
            type="button"
            onClick={toLoginPage}
            style={count < 5 ? styles.button : styles.buttonB}
          >
            LOGIN
          </button>
        </Grid>

        {/* MENGGUNAKAN MUI */}
        {count > 0 && (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setCount((count) => count + 1)}
              sx={{
                width: "100%",
                backgroundColor: { xs: "#FF1200", sm: "#FF1213", md: "#FF12AD" },
                borderRadius: "5px",
                boxShadow: "none",
              }}
            >
              MUI
            </Button>
          </Grid>
        )}

        {/* MENGGUNAKAN CUSTOM COMPONENT */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <AppButton onClick={() => setCount((count) => count + 1)}>
            Tambah 1
          </AppButton>
          <AppButton onClick={() => setCount((count) => count + 2)}>
            Tambah 2
          </AppButton>
        </Grid>

        {/* HASIL */}
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          {count}
        </Grid>
      </Grid>
    );
  } else {
    return <Typography>Tidak muncul</Typography>
  }  
}

export default ExamplePage;