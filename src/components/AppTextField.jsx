import { TextField } from "@mui/material";

function AppTextField({ formik, name, label, type = "text", value, onChange, ...props }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      id={name}
      name={name}
      label={label}
      type={type}
      //  Jika ada formik, pakai data formik. Jika tidak, pakai state biasa.
      value={formik ? formik.values[name] : value || ""}
      onChange={formik ? formik.handleChange : onChange}
      onBlur={formik ? formik.handleBlur : props.onBlur}
      error={formik ? (formik.touched[name] && Boolean(formik.errors[name])) : props.error}
      helperText={formik ? (formik.touched[name] && formik.errors[name]) : props.helperText}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&.Mui-focused fieldset": {
            borderColor: "#E05D36", 
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#E05D36", 
        },
        // Menerima tambahan sx dari luar (seperti margin bottom di MenuPages)
        ...props.sx, 
      }}
      {...props}
    />
  );
}

export default AppTextField;