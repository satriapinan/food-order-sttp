import Button from "@mui/material/Button";

const AppButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "12px",
        background: "linear-gradient(135deg, #2d8fa8 0%, #7fb2a5 100%)",
        boxShadow: "none",
        fontWeight: 700,
        textTransform: "none",
        px: 3,
        py: 1.3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 12px 24px rgba(45, 143, 168, 0.2)",
          background: "linear-gradient(135deg, #257d98 0%, #6fa796 100%)",
          transform: "translateY(-1px)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;