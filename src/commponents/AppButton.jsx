import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      type="button"
      variant="text"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: "#1976d2",
        borderRadius: "5px",
        boxShadow: "none",
        color: "#fff",
        cursor: "pointer",
        pointerEvents: "auto",
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