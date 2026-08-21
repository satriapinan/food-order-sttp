import Button from "@mui/material/Button";

const AppButton = ({ onClick, children }) => {
  return (
    <Button
      variant="text"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: "#1976d2", // Saya tambahkan 'd2' agar warna biru Material UI-nya valid
        borderRadius: "5px",
        boxShadow: "none",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#115293",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
