import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import AppButton from './components/AppButton';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container>
      {/* MANUAL */}
      <Grid item size={{ xs: 12, sm:6, md: 3}}>
      <button onClick={() => setCount((count) => count + 1)}
        style={{
          backgroundColor: "#1976d2",
          borderRadius: "5px",
          border: "none",
          color: "#FFF",
          padding: "10px",
        }}
        >TAMBAH 1</button>
        </Grid>
      {/* MUI */}

      <Grid item size={{xs: 12, sm:6, md: 3}}>
      <Button variant='contained'
       onClick={() => setCount((count) => count + 2)}
       sx={{
        width: "100px"
       }}>
      tambah 2
      </Button>
      </Grid>

      <Grid item size={{xs: 12, sm:6, md: 3}}>
      <AppButton onClick={() => setCount((count) => count + 1)}>
      tambah 1
      </AppButton>
      </Grid>

      <Grid item size={{xs: 12, sm:6, md: 3}}>
      <AppButton onClick={() => setCount((count) => count + 2)}>
      tambah 2
      </AppButton>
      </Grid>

      {count}
    </Grid>
  );
}

export default App
