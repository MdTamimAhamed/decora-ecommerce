import React from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import AppRouters from './routers/AppRouters.jsx';

import store from './app/store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';

const theme = createTheme({
  palette: {
    custom: {
      dark_red: '#c30010',
      custom_bg: '#F5F5F5',
    },
    primary: {
      main: '#0e0d0d',
    },
    secondary: {
      main: '#de2d2d',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Inter','Caveat', 'cursive', 'sans-serif'",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri:
              import.meta.env.NODE_ENV === 'development'
                ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV
                : import.meta.env.VITE_AUTH0_CALLBACK_URL_PROD,
          }}
        >
          <AppRouters />
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="dark"
          />
        </Auth0Provider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
