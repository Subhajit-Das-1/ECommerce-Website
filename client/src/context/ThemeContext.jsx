import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setTheme(newMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 