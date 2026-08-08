import { useState } from "react";
import AppButton from "../components/AppButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useParams, useSearchParams } from 'react-router-dom';

const styles ={
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
    backgroundColor: "#28d219",
    borderRadius: "5px",
    border: "1px solid #FFF",
    color: "#FFF",
    padding: "10px",
  }
}

function ExamplePage() {
    let {value} = useParams();
    let {searchParams} = useSearchParams();
  const show = true;
  const [count, setCount] = useState(0);

  if (show) {
  return (
    <Grid container>
    <Typography>Ini halaman Example - {value} -{searchParams.get("id")}</Typography>
      {/* MANUAL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={count < 5 ? styles.buttonA : styles.buttonB}
        >
          LOGIN
        </button>
      </Grid>

      {/* MENGGUNAKAN MUI */}
      {count > 1 && (
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
      )}
      {/* MENGGUNAKAN CUSTOM COMPONENT */}
      {count > 4 &&(
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <AppButton onClick={() => setCount((count) => count + 1)}>
          Tambah 1
        </AppButton>
        <AppButton onClick={() => setCount((count) => count + 2)}>
          Tambah 2
        </AppButton>
        <Typography>Ini halaman Example - {value} -{searchParams.get("id")}</Typography>
      </Grid>
      )}

      {/* HASIL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        {count}
      </Grid>
    </Grid>
  );
} else {
  return <Typography>
    Tidak Muncul
  </Typography>
}
}

export default ExamplePage;
