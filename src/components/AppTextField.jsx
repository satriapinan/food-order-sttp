import { TextField } from "@mui/material";
import { useTheme } from "../hooks/useTheme";

const AppTextField = ({ label, ...props }) => {
    const { mode } = useTheme();
    const isDark = mode === "dark";

    return (
        <TextField
            label={label}
            fullWidth
            variant="outlined"
            {...props}
            sx={{
                mb: 2,

                "& .MuiInputBase-input": {
                    color: isDark ? "#ffffff" : "#111111",
                },

                "& .MuiInputLabel-root": {
                    color: isDark ? "#aaaaaa" : "#666666",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#22c55e",
                },

                "& .MuiOutlinedInput-root": {
                    backgroundColor: isDark ? "#222222" : "#ffffff",

                    "& fieldset": {
                        borderColor: isDark ? "#444444" : "#cccccc",
                    },

                    "&:hover fieldset": {
                        borderColor: "#22c55e",
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "#22c55e",
                    },
                },

                "& .MuiFormHelperText-root": {
                    color: "#ef4444",
                },
            }}
        />
    );
};

export default AppTextField;