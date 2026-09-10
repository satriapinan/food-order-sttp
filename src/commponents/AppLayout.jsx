import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 96,
          right: 16,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 1,
          "@media (max-width: 800px)": {
            top: 80,
          },
        }}
      >
        {!user ? (
          <>
            <Button component={RouterLink} to="/login" size="small" sx={{ color: "var(--text)", border: "1px solid var(--border)", backgroundColor: "var(--surface)", textTransform: "none", "&:hover": { backgroundColor: "var(--surface-muted)" } }}>
              Login
            </Button>
            <Button component={RouterLink} to="/register" size="small" sx={{ color: "#fff", backgroundColor: "var(--accent)", textTransform: "none", "&:hover": { backgroundColor: "var(--accent-dark)" } }}>
              Register
            </Button>
          </>
        ) : null}
        <Button
          onClick={toggleTheme}
          variant="text"
          size="small"
          sx={{
            minWidth: 0,
            px: 1.5,
            color: "var(--text)",
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(0, 0, 0, .12)",
            "&:hover": { backgroundColor: "var(--surface-muted)" },
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