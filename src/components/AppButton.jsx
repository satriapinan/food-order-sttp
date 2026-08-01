import Button from "@mui/material/Button";

function AppButton({ onClick, children }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{ margin: "0 5px" }}
    >
      {children}
    </Button>
  );
}

export default AppButton;
