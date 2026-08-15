import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, type = "button", sx = {} }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type={type}
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: "5px",
        boxShadow: "none",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;