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
          sx={{
            borderRadius: "30px",
            padding: "8px 24px",
            fontWeight: "bold",
            letterSpacing: "1px",
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.03)",
            color: isDark ? "#ffffff" : "#121212",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.08)",
              transform: "translateY(-3px)",
              boxShadow: isDark
                ? "0 6px 20px rgba(255,255,255,0.15)"
                : "0 6px 20px rgba(0,0,0,0.15)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          {isDark ? "🌞 Light" : "🌙 Dark"}
        </Button>
      </Box>
      <Box sx={{ padding: "0 16px 16px" }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
