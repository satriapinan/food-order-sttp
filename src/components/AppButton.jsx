import Button from "@mui/material/Button";


const styles = {
  button: {
    backgroundColor:"#1976",
    borderRadius:"5px",
    boxShadow:"none",
  }
};


const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="text"
      color="primary"
      onClick={onClick}
      sx={styles.button}
    >
      {children}
    </Button>
  );
};

export default AppButton;