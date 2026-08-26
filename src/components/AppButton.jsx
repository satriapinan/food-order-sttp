import React from "react";
import { Button } from "@mui/material";

const AppButton = ({ children, type, disabled, onClick, sx }) => (
  <Button
    fullWidth
    type={type}
    disabled={disabled}
    onClick={onClick}
    variant="contained"
    sx={{
      backgroundColor: "#ff7e5f",
      py: 1.5,
      borderRadius: "12px",
      fontWeight: "bold",
      textTransform: "none",
      fontSize: "16px",
      boxShadow: "0 4px 15px rgba(255, 126, 95, 0.4)",
      transition: "all 0.3s",
      "&:hover": {
        backgroundColor: "#e65c00",
        boxShadow: "0 6px 20px rgba(255, 126, 95, 0.6)",
      },
      "&.Mui-disabled": { backgroundColor: "#ffb5a3", color: "#fff" },
      ...sx, // Menerima props tambahan jika ada
    }}
  >
    {children}
  </Button>
);

export default AppButton;