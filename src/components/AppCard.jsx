import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const AppCard = ({ children, sx = {} }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AppCard;