'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#0ea5e9', light: '#38bdf8', dark: '#0284c7', contrastText: '#ffffff' },
      secondary: { main: '#10b981', light: '#34d399', dark: '#059669', contrastText: '#ffffff' },
      error: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
      warning: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
      success: { main: '#10b981', light: '#34d399', dark: '#059669' },
      info: { main: '#0ea5e9', light: '#38bdf8', dark: '#0284c7' },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
        secondary: mode === 'light' ? '#475569' : '#94a3b8',
      },
      divider: mode === 'light' ? '#e2e8f0' : '#334155',
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.015em' },
      h3: { fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' },
      h4: { fontWeight: 600, lineHeight: 1.35 },
      h5: { fontWeight: 600, lineHeight: 1.4 },
      h6: { fontWeight: 600, lineHeight: 1.4 },
      body1: { lineHeight: 1.7 },
      body2: { lineHeight: 1.6 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)'
              : '0 1px 3px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiChip: { styleOverrides: { root: { fontWeight: 500, borderRadius: 6 } } },
      MuiTextField: {
        styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  });
  return responsiveFontSizes(theme);
};

export default getTheme;
