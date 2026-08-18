import Button from "@mui/material/Button";

function AppButton({ children, type = "button", onClick }) {
  return (
    <Button
      type={type} // Tambahkan ini agar bisa jadi type="submit"
      onClick={onClick} // Tambahkan ini agar bisa menerima event klik
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