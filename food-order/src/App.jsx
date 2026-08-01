import { useState } from "react";
import { Grid, Button } from "@mui/material";
import AppButton from "./components/AppButton";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{ minHeight: "100vh", p: 3 }}
    >
      <Grid item>
        <div className="hero">
          <img
            src={heroImg}
            className="base"
            width="170"
            height="179"
            alt=""
          />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </Grid>

      <Grid item textAlign="center">
        <h1>Get Started</h1>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR.
        </p>
      </Grid>

      <Grid item>
        <AppButton onClick={() => setCount(count + 1)}>
          Count is {count}
        </AppButton>
      </Grid>

      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;