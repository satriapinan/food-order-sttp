import { TextField } from "@mui/material";

const AppTextField = ({
  name: nama,
  label,
  value: nilai,
  onChange,
  onBlur,
  error: apakahError,
  helperText: teksBantuan,
  type: tipe = "text",
  fullWidth = true,
  size = "small",
  slotProps,
  ...props
}) => {
  return (
    <TextField
      name={nama}
      label={label}
      type={tipe}
      value={nilai}
      onChange={onChange}
      onBlur={onBlur}
      error={apakahError}
      helperText={teksBantuan}
      fullWidth={fullWidth}
      size={size}
      variant="outlined"
      slotProps={slotProps}
      {...props}
    />
  );
};

export default AppTextField;
