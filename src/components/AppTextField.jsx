import TextField from "@mui/material/TextField";
import { useTheme } from "../hooks/useTheme";

const AppTextField = ({ label, type = "text", value, onChange, sx = {}, ...props }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

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
        "& .MuiOutlinedInput-root": {
          color: isDark ? "#fff" : "#000",
          "& fieldset": {
            borderColor: isDark ? "#555" : "#ccc",
          },
          "&:hover fieldset": {
            borderColor: isDark ? "#888" : "#999",
          },
        },
        "& .MuiInputLabel-root": {
          color: isDark ? "#aaa" : "#666",
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default AppTextField;
