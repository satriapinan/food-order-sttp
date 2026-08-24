import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function AppSelect({
  label,
  value,
  onChange,
  options = [],
  fullWidth = true,
}) {
  return (
    <FormControl fullWidth={fullWidth} size="small">
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AppSelect;