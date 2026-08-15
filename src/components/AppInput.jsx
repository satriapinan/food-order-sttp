import TextField from "@mui/material/TextField";

const AppInput = ({ label, type = "text", value, onChange, name, required = true }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default AppInput;