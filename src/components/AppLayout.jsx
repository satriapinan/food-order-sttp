import { Box, Button } from "@mui/material";
import { useTheme } from "../hooks/useTheme";

const AppLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#111827" : "#fff7ed",
        color: isDark ? "#f3f4f6" : "#111827",
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          onClick={toggleTheme}
          variant="outlined"
          size="small"
          sx={{
            color: isDark ? "#fff" : "#111827",
            borderColor: isDark ? "#374151" : "#d1d5db",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            "&:hover": {
              backgroundColor: isDark ? "#374151" : "#f3f4f6",
            },
          }}
        >
          {isDark ? "Light" : "Dark"}
        </Button>
      </Box>

      <Box>{children}</Box>
    </Box>
  );
};

export default AppLayout;