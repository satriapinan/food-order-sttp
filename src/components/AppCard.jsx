import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "../hooks/useTheme";

const AppCard = ({ children, sx = {} }) => {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        color: isDark ? "#fff" : "#000",
        boxShadow: isDark
          ? "0 4px 20px rgba(0, 0, 0, 0.4)"
          : "0 4px 20px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AppCard;
