import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((currentMode) =>
            currentMode === 'light' ? 'dark' : 'light'
        );
    };

    const themeValue = useMemo(
        () => ({
            mode,
            toggleTheme,
        }),
        [mode]
    );

    return React.createElement(
        ThemeContext.Provider,
        { value: themeValue },
        children
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};