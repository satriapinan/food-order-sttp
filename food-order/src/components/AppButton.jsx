import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: "#1976d2",
        borderRadius: "5px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#1565c0",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;