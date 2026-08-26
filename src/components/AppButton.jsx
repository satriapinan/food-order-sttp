import React from "react";
import Button from "@mui/material/Button";

const AppButton = ({
  children,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  fullWidth = true,
  disabled = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      sx={{
        backgroundColor: variant === "contained" ? "#1976d2" : undefined,
        padding: "10px",
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "20px",
        boxShadow: "none",
        textTransform: "none", 
        "&:hover": {
          backgroundColor: variant === "contained" ? "#115293" : undefined,
          boxShadow: "none",
        },
        ...sx, 
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;