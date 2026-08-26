import { Snackbar, Alert } from "@mui/material";

const AppSnackbar = ({
  open: terbuka,
  message: pesan,
  severity: tingkatKeparahan = "success",
  onClose: saatDitutup,
}) => {
  return (
    <Snackbar
      open={terbuka}
      autoHideDuration={3000}
      onClose={saatDitutup}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={saatDitutup}
        severity={tingkatKeparahan}
        variant="filled"
        sx={{ width: "100%", fontWeight: "bold" }}
      >
        {pesan}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
