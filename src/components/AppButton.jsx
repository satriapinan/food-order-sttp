import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, sx = {} }) => {
  return (
    <Button
      variant="contained"
      color="primary"
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
