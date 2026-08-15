import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, type = "button" }) => {
  return (
    <Button
      type={type}
      variant="contained"
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "#1976d2",
        color: "#FFF",
        borderRadius: "5px",
        boxShadow: "none",
        py: 1.2,
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "#115293",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;