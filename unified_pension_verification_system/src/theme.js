import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E3A8A',
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    divider: '#E5E7EB',
    success: {
      main: '#16A34A',
      light: '#DCFCE7',
      contrastText: '#0F172A',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      contrastText: '#0F172A',
    },
    error: {
      main: '#DC2626',
      light: '#FEE2E2',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2563EB',
      light: '#DBEAFE',
      contrastText: '#0F172A',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.2rem' },
    h2: { fontWeight: 700, fontSize: '1.6rem' },
    h3: { fontWeight: 600, fontSize: '1.3rem' },
    h4: { fontWeight: 600, fontSize: '1.1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(15, 23, 42, 0.08)',
    '0px 6px 16px rgba(15, 23, 42, 0.1)',
    '0px 12px 24px rgba(15, 23, 42, 0.12)',
    ...Array(21).fill('0px 12px 24px rgba(15, 23, 42, 0.12)'),
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E7EB',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 18px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          color: '#111827',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#0F172A',
          color: '#E2E8F0',
          borderRight: 'none',
        },
      },
    },
  },
});

export default theme;
