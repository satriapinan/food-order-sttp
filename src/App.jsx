import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AppButton from "./components/AppButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid container spacing={2}>
      {/* MANUAL */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            width: "100%",
            backgroundColor: "#1976d2",
            borderRadius: "5px",
            border: "none",
            color: "#FFF",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          TEST
        </button>
      </Grid>

      {/* MENGGUNAKAN MUI */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount((count) => count + 1)}
          sx={{
            width: "100%",
            borderRadius: "5px",
            boxShadow: "none",
          }}
        >
          MUI
        </Button>
      </Grid>

      {/* CUSTOM COMPONENT */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AppButton onClick={() => setCount((count) => count + 1)}>
          Tambah 1
        </AppButton>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <AppButton onClick={() => setCount((count) => count + 2)}>
          Tambah 2
        </AppButton>
      </Grid>

      {/* HASIL */}
      <Grid size={{ xs: 12 }}>
        <h2>{count}</h2>
      </Grid>
    </Grid>
  );
}

export default App;