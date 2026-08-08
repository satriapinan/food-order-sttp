import Button from "@mui/material/Button";

const styles ={
  button: {
    backgroundColor: "#638fd7",
    borderRadius: "5px",
    boxShadow: "none",
    color: "#fff",
  }
}

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={styles.button}
    >
      {children}
    </Button>
  );
};

export default AppButton;