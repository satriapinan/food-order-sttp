import { useState } from "react";

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // "success" (hijau) atau "error" (merah)
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
}