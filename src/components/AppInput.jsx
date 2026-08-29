import TextField from "@mui/material/TextField";

const AppInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={Boolean(error)}
      helperText={helperText}
      required={required}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
      {...rest}
    />
  );
};

export default AppInput;