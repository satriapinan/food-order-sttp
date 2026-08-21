import Button from "@mui/material/Button";

const styles = {
  button: {
    backgroundColor: "#1976",
    borderRadius: "5px",
    boxShadow: "none",
  },
};

const AppButton = ({ children, ...props }) => {
  return (
    <Button
      variant="text"
      color="primary"
      sx={styles.button}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;