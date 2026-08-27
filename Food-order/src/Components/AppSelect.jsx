import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export default function AppSelect({ label, name, value, onChange, onBlur, error, helperText, options, sx, size = "small" }) {
  return (
    <FormControl fullWidth error={error} sx={sx} size={size}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          borderRadius: "8px",
          backgroundColor: "background.paper",
          textAlign: "left"
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
