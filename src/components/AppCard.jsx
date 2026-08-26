import React from "react";
import Paper from "@mui/material/Paper";
import { useTheme } from "../hooks/useTheme";

const AppCard = ({ children, sx, ...props }) => {
  const theme = useTheme();
  const isDark = theme?.mode === "dark";

  return (
    <Paper
      elevation={4}
      sx={{
        padding: { xs: 3.5, sm: 4.5 },
        width: "100%",
        maxWidth: 440,
        borderRadius: "24px",
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#ffffff" : "inherit",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        boxShadow: isDark
          ? "0 12px 40px rgba(0, 0, 0, 0.7)"
          : "0 12px 40px rgba(173, 20, 87, 0.25)",
        transition: "all 0.3s ease",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default AppCard;
