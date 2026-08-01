import { useState } from "react";
import AppButton from "./components/AppButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid container>
      {/* MANUAL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            width: "100%",
            backgroundColor: "#1976d2",
            borderRadius: "5px",
            border: "1px solid #FFF",
            color: "#FFF",
            padding: "10px",
          }}
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
            borderRadius: "5px",
            boxShadow: "none",
          }}
        >
          MUI
        </Button>
      </Grid>

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
}

export default App;
