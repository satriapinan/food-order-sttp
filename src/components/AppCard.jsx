import Card from "@mui/material/Card";

const AppCard = ({ children }) => {
  return (
    <Card
      elevation={4}
      sx={{
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {children}
    </Card>
  );
};

export default AppCard;