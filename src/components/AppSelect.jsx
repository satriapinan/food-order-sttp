import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../hooks/useTheme";

const AppSelect = ({ label, value, onChange, options = [], sx = {}, ...props }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      sx={{
        minWidth: 140,
        "& .MuiOutlinedInput-root": {
          color: isDark ? "#fff" : "#000",
          "& fieldset": {
            borderColor: isDark ? "#555" : "#ccc",
          },
          "&:hover fieldset": {
            borderColor: isDark ? "#888" : "#999",
          },
        },
        "& .MuiInputLabel-root": {
          color: isDark ? "#aaa" : "#666",
        },
        "& .MuiSvgIcon-root": {
          color: isDark ? "#aaa" : "#666",
        },
        ...sx,
      }}
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              sx: {
                backgroundColor: isDark ? "#2a2a2a" : "#fff",
                color: isDark ? "#fff" : "#000",
              },
            },
          },
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default AppSelect;
