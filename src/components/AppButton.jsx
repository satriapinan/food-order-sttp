import Button from "@mui/material/Button";

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
  },
};

const AppButton = ({ onClick, children, ...props }) => {
  return (
    <Button variant="contained" onClick={onClick} sx={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
