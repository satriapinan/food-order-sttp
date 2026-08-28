import { TextField } from "@mui/material";

function AppTextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error = false,
  helperText = "",
  fullWidth = true,
  ...rest
}) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      {...rest}
    />
  );
}

export default AppTextField;