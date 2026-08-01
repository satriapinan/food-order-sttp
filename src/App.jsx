import { useState } from "react";
import Button from '@mui/material/Button';
import AppButton from "./commponents/AppButton";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme();

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", gap: "15px", alignItems: "center", padding: "20px" }}>
        {/* MANUAL */}
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            backgroundColor: "#1976d2",
            borderRadius: "5px",
            border: "none",
            color: "#FFF",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          MUI
        </button>

        {/* MENGGUNAKAN MUI */}
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
        >
          MUI
        </Button>

        {/* MENGGUNAKAN CUSTOM COMPONENT */}
        <AppButton onClick={() => setCount((count) => count + 1)}>
          Tambah 1
        </AppButton>
        <AppButton onClick={() => setCount((count) => count + 2)}>
          Tambah 2
        </AppButton>

        {/* HASIL */}
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Count: {count}
        </span>
      </div>
    </ThemeProvider>
  );
}

export default App;