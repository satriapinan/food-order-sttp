import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../hooks/useTheme";

const AppSelect = ({ label, options = [], sx = {}, ...props }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size={props.size || "medium"}
      sx={{ minWidth: 120, ...sx }}
    >
      <InputLabel
        sx={{
          color: isDark ? "#aaa" : "#555",
          "&.Mui-focused": { color: "#6D5BD0" },
        }}
      >
        {label}
      </InputLabel>
      <Select
        label={label}
        sx={{
          color: isDark ? "#fff" : "#000",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDark ? "#555" : "#ccc",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: isDark ? "#888" : "#999",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6D5BD0",
          },
          "& .MuiSvgIcon-root": {
            color: isDark ? "#aaa" : "#555",
          },
        }}
        {...props}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
