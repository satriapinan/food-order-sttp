import TextField from "@mui/material/TextField";

// CUSTOM COMPONENT TEXT FIELD
const AppTextField = ({ label, type = "text", value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        marginBottom: "16px",
      }}
      {...props}
    />
  );
};

export default AppTextField;
