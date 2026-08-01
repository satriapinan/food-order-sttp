import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AppButton from "./components/AppButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {/* MANUAL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
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
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
          sx={{
            width: "100%",
            backgroundColor: "#1976d2",
            color: "#FFF",
            borderRadius: "5px",
            boxShadow: "none",
          }}
        >
          MUI
        </Button>
      </Grid>

      {/* MENGGUNAKAN CUSTOM COMPONENT */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <AppButton onClick={() => setCount((count) => count + 1)}>
            Tambah 1
          </AppButton>
          <AppButton onClick={() => setCount((count) => count + 2)}>
            Tambah 2
          </AppButton>
        </div>
      </Grid>

      {/* HASIL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          Hasil: {count}
        </div>
      </Grid>
    </Grid>
  );
}

export default App;