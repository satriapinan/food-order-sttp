import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "../hooks/useTheme";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
        transition: "background-color 0.3s ease",
        color: isDark ? "#fff" : "#000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 16px",
        }}
      >
        <Button
          onClick={toggleTheme}
          variant="text"
          size="small"
          sx={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            color: isDark ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: isDark ? "#3a3a3a" : "#f0f0f0",
            },
          }}
        >
          {isDark ? "Light" : "Dark"}
        </Button>
      </Box>

      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
