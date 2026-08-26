import React from "react";
import Card from "@mui/material/Card";

const AppCard = ({ children, sx, ...props }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AppCard;