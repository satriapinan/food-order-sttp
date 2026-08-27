import Button from "@mui/material/Button";

const style = {
  button: {
    backgroundColor: "#6D5BD0",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(109,91,208,0.35)",
    color: "#fff",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "15.5px",
    paddingTop: "11px",
    paddingBottom: "11px",
    "&:hover": {
      backgroundColor: "#5A4AB8",
      boxShadow: "0 8px 20px rgba(109,91,208,0.45)",
    },
  },
};

const AppButton = ({ onClick, children, type = "button", disabled = false }) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      fullWidth
      disableElevation
      sx={style.button}
    >
      {children}
    </Button>
  );
};

export default AppButton;