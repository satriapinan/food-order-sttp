import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const styles = {
  button: {
    marginTop: "8px",
    padding: "10px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    background: "linear-gradient(to right, #b22222, #8b0000)",
    boxShadow: "none",
    "&:hover": {
      background: "linear-gradient(to right, #8b0000, #5c0000)",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      background: "#e0e0e0",
      color: "#9e9e9e",
    },
  },
};

const AppButton = ({
  onClick,
  children,
  isLoading: sedangMemuat,
  disabled,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled || sedangMemuat}
      sx={styles.button}
      {...props}
    >
      {sedangMemuat ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default AppButton;
