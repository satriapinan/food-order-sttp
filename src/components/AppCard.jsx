import Card from "@mui/material/Card";

const AppCard = ({ children, sx = {}, ...props }) => {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "28px",
        boxShadow: "0 24px 60px rgba(21, 34, 44, 0.10)",
        overflow: "hidden",
        transition: "background-color 0.3s ease, color 0.3s ease",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AppCard;