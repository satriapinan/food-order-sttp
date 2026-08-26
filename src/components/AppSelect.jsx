import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "../hooks/useTheme";

const AppSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  size = "small",
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  return (
    <FormControl size={size} sx={{ minWidth: 160, ...sx }}>
      {label && (
        <InputLabel
          id={`${name}-label`}
          sx={{
            color: isDark ? "#aaa" : "#757575",
            "&.Mui-focused": { color: "#c2185b" },
          }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        labelId={label ? `${name}-label` : undefined}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          borderRadius: "12px",
          backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
          color: isDark ? "#ffffff" : "#4b5563",
          "& .MuiSelect-icon": {
            color: isDark ? "#f48fb1" : "#c2185b",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDark ? "#555" : "#f48fb1",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c2185b",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c2185b",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: isDark ? "#2d2d2d" : "#ffffff",
              color: isDark ? "#ffffff" : "#1f2937",
              boxShadow: isDark
                ? "0 8px 32px rgba(0, 0, 0, 0.8)"
                : "0 8px 32px rgba(173, 20, 87, 0.15)",
              "& .MuiMenuItem-root": {
                "&:hover": {
                  backgroundColor: isDark ? "rgba(244, 143, 177, 0.15)" : "#fce4ec",
                },
                "&.Mui-selected": {
                  backgroundColor: isDark ? "rgba(244, 143, 177, 0.25)" : "#f8bbd0",
                  fontWeight: "bold",
                },
              },
            },
          },
        }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={String(option.value)} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
