import { useTheme } from "../hooks/useTheme"
import { Box, Button } from "@mui/material";


const AppLayout = ({ children }) => {
    const { mode, toggleTheme } = useTheme();
    const isDark = mode === "dark";

    return(
        <Box
        sx={{
            minHeight: "100vh",
            backgroundColor: isDark ? "#fff" : "#161515",
            transition: "bacground-color 0.9 ease",
            color: isDark ? "#fff" : "#000"
        }}
        >
            <Box>
            <Button 
                onClick={toggleTheme}
                variant="outlined"
                size="small"
                sx={{
                color: isDark ? "#000000" : "#ffffff",
                backgroundColor: isDark ? "#e2dfdf" : "#292929",
                }}
            >
                {isDark? "light" : "dark"}
            </Button>
            </Box>
            <Box>{children}</Box>
        </Box>
        
    );
};

export default AppLayout;