import React from 'react';
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
					domain='dev-f0rg24fwovsf4did.us.auth0.com'
					clientId='IL9fr6fLPdaoPeWhO6FNCEJ0yI2s9Z7P'
					authorizationParams={{
						redirect_uri: window.location.origin,
					}}>
					<AppRouters />
					<ToastContainer
						position='top-center'
						autoClose={2500}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable={false}
						pauseOnHover
						theme='dark'
					/>
				</Auth0Provider>
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
