import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ConfirmationProvider, Snackbar, theme } from '@<%= npmScope %>/<%= designSystemProject %>'

import { config } from './config/react-query-config';
import Routes from './pages/RootRoutes';
import { AuthProviderApp } from '../utils/auth-strapi';

// Create a client
const queryClient = new QueryClient(config);

function App() {
  return (
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Snackbar>
                <CssBaseline />
                <AuthProviderApp>
                  <ConfirmationProvider>
                    <Routes />
                  </ConfirmationProvider>
                </AuthProviderApp>
              </Snackbar>
            </ThemeProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </React.StrictMode>
  );
}

export default App;
