import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AppCard from "../components/AppCard";

function NotFound() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "calc(100vh - 110px)", px: 2 }}>
      <AppCard sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: 800 }}>404</Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>Halaman tidak ditemukan</Typography>
        <Button component={Link} to="/" variant="contained">Kembali ke beranda</Button>
      </AppCard>
    </Stack>
  );
}

export default NotFound;
