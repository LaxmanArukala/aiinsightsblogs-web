'use client';

import { ReactNode, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from '@/src/redux/store';
import { useAppSelector } from '@/src/redux/hooks';
import getTheme from '@/src/themes';

function MuiThemeProvider({ children }: { children: ReactNode }) {
  const themeMode = useAppSelector(s => s.ui.themeMode);
  const theme = getTheme(themeMode);
  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } }));
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
