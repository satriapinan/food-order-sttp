import Button from "@mui/material/Button";

const AppButton = ({ onClick, children, sx, ...props }) => {
  return (
    <Button 
      variant="contained" 
      onClick={onClick} 
      sx={{ 
        background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
        color: "white",
        fontWeight: "bold",
        borderRadius: "12px",
        py: 1.2,
        textTransform: "none",
        fontSize: "1.05rem",
        boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(255, 107, 107, 0.5)",
        },
        ...sx 
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;