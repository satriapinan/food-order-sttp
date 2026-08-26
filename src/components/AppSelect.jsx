import { TextField, MenuItem } from "@mui/material";

const AppSelect = ({
  name: nama,
  label,
  value: nilai,
  onChange,
  options: pilihan = [],
  fullWidth = false,
  size = "small",
  sx,
  ...props
}) => {
  return (
    <TextField
      select
      name={nama}
      label={label}
      value={nilai}
      onChange={onChange}
      fullWidth={fullWidth}
      size={size}
      variant="outlined"
      sx={sx}
      {...props}
    >
      {pilihan.map((opsi) => (
        <MenuItem key={opsi.value} value={opsi.value}>
          {opsi.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default AppSelect;
