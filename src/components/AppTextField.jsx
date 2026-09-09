import React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "../hooks/useTheme";

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
}) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
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
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(255, 255, 255, 0.6)",
          color: isDark ? "#f5f6fa" : "#2d3436",
          transition: "all 0.3s ease-in-out",
          "& fieldset": {
            borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "transparent",
          },
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.9)",
            "& fieldset": {
              borderColor: "#ff7e5f",
            },
          },
          "&.Mui-focused": {
            backgroundColor: isDark ? "#24252e" : "#fff",
            boxShadow: "0 0 15px rgba(255, 126, 95, 0.4)",
            "& fieldset": {
              borderColor: "#ff7e5f",
              borderWidth: "2px",
            },
          },
        },
        "& .MuiInputLabel-root": {
          color: isDark ? "#a4b0be" : "#636e72",
          "&.Mui-focused": {
            color: "#ff7e5f",
          },
        },
        "& .MuiFormHelperText-root": {
          color: isDark ? "#ff6b6b" : undefined,
        },
        ...sx,
      }}
    />
  );
};

export default AppTextField;
