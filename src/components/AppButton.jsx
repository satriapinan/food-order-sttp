import Button from '@mui/material/Button';

function AppButton({ children, onClick, variant = 'contained', sx, ...props }) {
  return (
    <Button 
      variant={variant} 
      onClick={onClick} 
      disableElevation
      sx={{
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AppButton;
