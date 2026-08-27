import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function AppCard({ children, sx, ...props }) {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 400, 
        padding: '16px', 
        borderRadius: '12px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        ...sx 
      }} 
      {...props}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </CardContent>
    </Card>
  );
}

export default AppCard;
