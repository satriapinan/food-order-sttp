import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="text"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: "rgba(37, 97, 201, 0.4)",
        borderRadius: "5px",
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;