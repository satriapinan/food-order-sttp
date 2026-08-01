import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="text"
      color="primary"
      onClick={onClick}
      sx={{
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