import Button from "@mui/material/Button";

function AppButton({ children, type = "button", onClick, disabled }) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      fullWidth
      sx={{
        mt: 2,
        // Warna Oranye Hangat
        background: "linear-gradient(135deg, #F26419 0%, #E05D36 100%)",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
        color: "#fff",
        textTransform: "none",
        fontSize: "16px",
        boxShadow: "0 4px 15px rgba(224, 93, 54, 0.4)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #E05D36 0%, #C94C27 100%)",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(224, 93, 54, 0.6)",
        },
        "&:disabled": {
          background: "#ccc",
          color: "#888",
        }
      }}
    >
      {children}
    </Button>
  );
}

export default AppButton;