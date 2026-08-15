import Button from "@mui/material/Button";

const AppButton = ({ type = "button", onClick, children, sx, ...props }) => {
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth
      onClick={onClick}
      sx={{
        backgroundColor: "#c2185b",
        paddingY: 1.4,
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "12px",
        textTransform: "none",
        boxShadow: "0px 8px 20px rgba(194, 24, 93, 0.25)",
        "&:hover": { backgroundColor: "#ad1457" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;