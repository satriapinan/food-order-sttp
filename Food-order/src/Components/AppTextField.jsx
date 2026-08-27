import TextField from '@mui/material/TextField';

function AppTextField(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "background.paper",
        },
        ...props.sx
      }}
      {...props}
    />
  );
}

export default AppTextField;
