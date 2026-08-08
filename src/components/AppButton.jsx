import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, ...props }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      fullWidth
      {...props}
      sx={{
        paddingY: 1.2,
        borderRadius: "10px",
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "0.95rem",
        borderColor: "#974063",
        color: "#974063",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#79334f",
          backgroundColor: "rgba(151, 64, 99, 0.08)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;