import TextField from "@mui/material/TextField";

const AppTextField = (props) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px",
          backgroundColor: "rgba(245, 247, 249, 0.8)",
          transition: "all 0.2s ease",
          "& fieldset": {
            borderColor: "var(--border-color)",
          },
          "&:hover fieldset": {
            borderColor: "#5aaac0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2d8fa8",
            borderWidth: "1.5px",
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--text-secondary)",
        },
        "& .MuiInputBase-input": {
          color: "var(--text-primary)",
        },
      }}
      {...props}
    />
  );
};

export default AppTextField;