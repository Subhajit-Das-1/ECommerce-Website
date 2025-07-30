import { createTheme } from '@mui/material/styles';

// Light theme colors
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2874f0',
      light: '#5a9cff',
      dark: '#1a5bb8',
    },
    secondary: {
      main: '#fb641b',
      light: '#ff8a4d',
      dark: '#c94a00',
    },
    background: {
      default: '#f2f2f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#878787',
    },
    divider: '#f0f0f0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '2px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

// Dark theme colors
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Primary Blue
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6', // Violet for gradient
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0d1117', // Deep navy blue background
      paper: '#0f172a', // Slightly lighter background for cards
    },
    text: {
      primary: '#a78bfa', // Soft indigo/violet for headings
      secondary: '#cbd5e1', // Light gray for secondary text
    },
    divider: '#1e293b', // Button border color
    action: {
      hover: 'rgba(59, 130, 246, 0.2)', // Subtle blue hover effects
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '2px',
          border: '1px solid #1e293b', // Button border
          '&:hover': {
            boxShadow: '0 4px 8px rgba(59, 130, 246, 0.2)', // Subtle blue shadow
          },
        },
        contained: {
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', // Gradient for CTA buttons
          '&:hover': {
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          border: '1px solid #1e293b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#0d1117',
          borderBottom: '1px solid #1e293b',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#0f172a',
        },
      },
    },
  },
});

export { lightTheme, darkTheme }; 