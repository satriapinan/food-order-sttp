import Button from "@mui/material/Button";

// CUSTOM COMPONENT BUTTON
const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: "5px",
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
