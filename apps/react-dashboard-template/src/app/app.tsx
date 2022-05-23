import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query'

import { config } from './config/react-query-config'
import Routes from './pages/RootRoutes'
import theme from './styles/theme';

// Create a client
const queryClient = new QueryClient(config)

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <CssBaseline />
              <Routes />
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
