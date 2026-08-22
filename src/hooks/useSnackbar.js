import { useState } from "react";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (msg, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return { open, message, severity, showSnackbar, handleClose };
};