import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "../hooks/useTheme";

const AppTextField = ({ label, type = "text", name, value, onChange, onBlur, error, helperText, InputProps, ...props }) => {
  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
          color: isDark ? "#ffffff" : "inherit",
          "& fieldset": { borderColor: isDark ? "#444" : "#f48fb1" },
          "&:hover fieldset": { borderColor: "#c2185b" },
          "&.Mui-focused fieldset": { borderColor: "#c2185b", borderWidth: "1.5px" },
        },
        "& .MuiInputLabel-root": {
          color: isDark ? "#aaa" : "#757575",
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "#c2185b" },
        "& .MuiFormHelperText-root": {
          fontSize: "12px",
          marginTop: "4px",
          marginLeft: "4px",
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default AppTextField;
