import Button from "@mui/material/Button";


function AppButton({ children }) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        mt: 2,
        background: "linear-gradient(to right, #2158EF, #1C66F0)",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "8px",
        color: "#fff",
      }}
    >
      {children}
    </Button>
  );
}

export default AppButton;