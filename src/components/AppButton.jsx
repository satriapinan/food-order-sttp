import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, type = "button" }) => {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#1976d2",
        padding: "10px",
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "20px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#115293",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;