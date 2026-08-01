import { useState } from "react"; // buat nyimpen angka yang bisa berubah-ubah
import Button from "@mui/material/Button"; // pinjem tombol dari MUI, biar gak bikin css sendiri
import Grid from "@mui/material/Grid"; // buat atur layout kolom biar rapi
import AppButton from "./components/AppButton"; // tombol bikinan sendiri, biar gak nulis ulang-ulang

function App() {
  const [count, setCount] = useState(0); // count mulai dari 0, setCount buat nambahin

  return (
    <Grid container> {/* wadah utama, isinya kolom-kolom di bawah */}

      {/* MANUAL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <button
          onClick={() => setCount((count) => count + 1)} // klik = count nambah 1
          style={{
            width: "100%",
            backgroundColor: "#1976d2",
            borderRadius: "5px",
            border: "none",
            color: "#FFF",
            padding: "10px",
          }}
        >
          TEST {/* tombol manual, css nulis sendiri */}
        </button>
      </Grid>

      {/* MENGGUNAKAN MUI */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Button
          variant="text"
          color="primary"
          onClick={() => setCount((count) => count + 1)} // nambah count juga
          sx={{
            width: "100%",
            // nyoba bikin warna beda-beda tiap ukuran layar (responsive color)
            backgroundColor: { xs: "#FF12", sm: "#FF1213", md: "#FF12AD" },
            borderRadius: "5px",
            boxShadow: "none",
          }}
        >
          MUI {/* enak nih tinggal pake, gak perlu css manual */}
        </Button>
      </Grid>

      {/* MENGGUNAKAN CUSTOM COMPONENT */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <AppButton onClick={() => setCount((count) => count + 1)}>
          Tambah 1
        </AppButton>
        <AppButton onClick={() => setCount((count) => count + 2)}>
          Tambah 2 {/* nambahnya 2 langsung, biar keliatan bedanya */}
        </AppButton>
      </Grid>

      {/* HASIL */}
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        {count} {/* angka hasil klik, semua tombol nyambung ke sini */}
      </Grid>

    </Grid>
  );
}

export default App;
