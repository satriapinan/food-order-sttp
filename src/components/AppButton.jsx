import Button from "@mui/material/Button";

const style = {
  button: {
    backgroundColor: "#1976d2",
    borderRadius: "5px",
    boxShadow: "none",
    color: "#fff",
  },
};

const AppButton = ({ onClick, children, type = "button" }) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      onClick={onClick}
      fullWidth
      sx={style.button}
    >
      {children}
    </Button>
  );
};

export default AppButton;