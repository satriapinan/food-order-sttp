import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "./assets/hooks/useTheme";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--page-bg)",
        color: "var(--text-primary)",
        transition: "background-color 0.3s ease, color 0.3s ease",
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
            backgroundColor: "var(--surface-muted)",
            color: "var(--text-primary)",
            "&:hover": {
              backgroundColor: "var(--border-color)",
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