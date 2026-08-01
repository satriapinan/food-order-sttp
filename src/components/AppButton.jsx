import Button from "@mui/material/Button";

// CUSTOM COMPONENT BUTTON
const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="text"
      color="primary"
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "#1976",
        borderRadius: "5px",
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
