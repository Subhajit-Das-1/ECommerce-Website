import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      marginRight: 2,
      marginLeft: 1
    }}>
      <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          size="medium"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeToggle; 