import Button from '@mui/material/Button';

function AppButton({ children, onClick, variant = 'contained', ...props }) {
  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {children}
    </Button>
  );
}

export default AppButton;
