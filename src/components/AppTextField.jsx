import TextField from "@mui/material/TextField";
import { useTheme } from "../hooks/useTheme";

const AppTextField = ({ sx, ...props }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  const baseSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: isDark ? "#2A2A2A" : "#FAFAFD",
      "& fieldset": { borderColor: isDark ? "#3D3D3D" : "#E5E2F2" },
      "&:hover fieldset": { borderColor: "#6D5BD0" },
      "&.Mui-focused fieldset": { borderColor: "#6D5BD0", borderWidth: "1.5px" },
    },
    "& .MuiInputLabel-root": { color: isDark ? "#999" : undefined },
    "& .MuiOutlinedInput-input": { color: isDark ? "#fff" : undefined },
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{ ...baseSx, ...sx }}
      {...props}
    />
  );
};

export default AppTextField;