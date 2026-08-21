import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "../hooks/useTheme";

const AppLayout = ({ children }) => {
  const { mode, toggleTheme } = useTheme();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        // isi tersembunyi (collapsed)
      }}
    >
      <Box
        sx={{
          // isi tersembunyi (collapsed)
        }}
      >
        <Button
          onClick={toggleTheme}
          variant="text"
          size="small"
          sx={{
            // isi tersembunyi (collapsed)
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