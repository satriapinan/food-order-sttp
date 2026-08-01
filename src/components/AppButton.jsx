import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "#1976d2",
        color: "#FFF",
        borderRadius: "5px",
        boxShadow: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;