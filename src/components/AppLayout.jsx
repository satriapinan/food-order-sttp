import { Box, Button } from '@mui/material';
import { useTheme } from '../hooks/useTheme';

const AppLayout = ({ children }) => {
    const { mode, toggleTheme } = useTheme();
    const isDark = mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: isDark ? '#151515' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                transition: 'background-color 0.3s ease, color 0.3s ease',

                position: 'relative',
            }}
        >
            {/* TOMBOL DI POJOK KANAN ATAS */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 1000,
                }}
            >
                <Button
                    onClick={toggleTheme}
                    variant="text"
                    size="small"
                   
                    sx={{
                        minWidth: 'auto',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: isDark
                            ? '#222222'
                            : '#f5f5f5',
                        color: isDark
                            ? '#ffffff'
                            : '#151515',

                        '&:hover': {
                            backgroundColor: isDark
                                ? '#333333'
                                : '#e5e5e5',
                        },

                        transition: 'all 0.3s ease',
                    }}
                >
                    {isDark ? 'Light' : 'Dark'}
                </Button>
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default AppLayout;