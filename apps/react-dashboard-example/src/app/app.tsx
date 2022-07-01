import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Snackbar, theme } from '@kudaterbang/ui-mui-react-example';
import { ConfirmationProvider } from '@kudaterbang/util-confirmation';

import { config } from './config/react-query-config';
import Routes from './pages/RootRoutes';
import { AuthProviderApp } from '../utils/auth-strapi';

// Create a client
const queryClient = new QueryClient(config);

function App() {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
}

export default App;
