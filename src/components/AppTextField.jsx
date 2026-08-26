import React from "react";
import { TextField } from "@mui/material";

const AppTextField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  endAdornment,
  sx,
}) => (
  <TextField
    fullWidth
    variant="outlined"
    margin="normal"
    label={label}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    placeholder={placeholder}
    slotProps={endAdornment ? { input: { endAdornment } } : {}}
    sx={{
      mt: 0,
      mb: 2.5,
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        transition: "all 0.3s ease-in-out",
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
        "&.Mui-focused": {
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(255, 126, 95, 0.5)",
        },
      },
      ...sx,
    }}
  />
);

export default AppTextField;
