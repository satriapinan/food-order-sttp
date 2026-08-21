import { useState } from "react";
import AppButton from "../AppButton.jsx";
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
    cursor: "pointer",
  },
  buttonB: {
    width: "100%",
    backgroundColor: "#44d219",
    borderRadius: "5px",
    border: "1px solid #FFF",
    color: "#FFF",
    padding: "10px",
    cursor: "pointer",
  },
};

function ExamplePage() {
  const [count, setCount] = useState(0);
  const increment = (amount) => setCount((prev) => prev + amount);

  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 4, display: "flex", flexWrap: "wrap" }}
    >
      <Grid item xs={12} sm={6} md={3}>
        <button
          type="button"
          onClick={() => increment(1)}
          style={count < 5 ? styles.button : styles.buttonB}
        >
          LOGIN
        </button>
      </Grid>
      {count > 0 ? (
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="text"
            color="primary"
            onClick={() => increment(1)}
            sx={{
              width: "100%",
              backgroundColor: { xs: "#FF1200", sm: "#FF1213", md: "#FF12AD" },
              color: "#FFF",
              borderRadius: "5px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: {
                  xs: "#CC0E00",
                  sm: "#CC0E0F",
                  md: "#CC0E8A",
                },
              },
            }}
          >
            MUI
          </Button>
        </Grid>
      ) : null}
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <AppButton onClick={() => increment(1)}>Tambah 1</AppButton>
        <AppButton onClick={() => increment(2)}>Tambah 2</AppButton>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h4" fontWeight="bold">
          {count}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ExamplePage;
