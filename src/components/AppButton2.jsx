import Button from "@mui/material/Button";

const styles ={
  button: {
    backgroundColor: "#638fd7",
    borderRadius: "5px",
    boxShadow: "none",
    color: "#fff",
  }
}

const AppButton2 = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={styles.button}
      href="/login"
    >
      {children}
    </Button>
  );
};

export default AppButton2;