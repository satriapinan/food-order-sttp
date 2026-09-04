import TextField from "@mui/material/TextField";
import { useTheme } from "../hooks/useTheme";

const AppTextField = ({ sx = {}, ...props }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiInputBase-input": {
          color: isDark ? "#fff" : "#000",
        },
        "& .MuiInputLabel-root": {
          color: isDark ? "#aaa" : "#555",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: isDark ? "#555" : "#ccc",
          },
          "&:hover fieldset": {
            borderColor: isDark ? "#888" : "#999",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6D5BD0",
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default AppTextField;
