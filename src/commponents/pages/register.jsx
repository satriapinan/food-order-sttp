import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  IconButton, 
  InputAdornment, 
  Link as MuiLink,
  TextField, 
  ThemeProvider, 
  Typography, 
  createTheme 
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5a8e94', // Warna teal sesuai gambar
    },
    background: {
      default: '#f4f7f8', 
    }
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  }
});

// Icon Mata (Eye) dari SVG agar tidak perlu install package tambahan
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#888'}}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#888'}}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" y1="2" x2="22" y2="22"/>
  </svg>
);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const textFieldStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fafafa',
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 16px',
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          padding: 2
        }}
      >
        <Container maxWidth="sm" sx={{ 
          backgroundColor: '#fff', 
          borderRadius: '24px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          padding: { xs: 4, md: 6 },
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            Join us today and get started
          </Typography>

          <Box component="form" sx={{ width: '100%' }}>
            <TextField
              fullWidth
              placeholder="Username"
              variant="outlined"
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              sx={textFieldStyles}
            />
            <TextField
              fullWidth
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, #5a8e94 0%, #46797f 100%)',
                boxShadow: '0 4px 12px rgba(90, 142, 148, 0.4)'
              }}
            >
              Create Account
            </Button>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
                Sign in here
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}