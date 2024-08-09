import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouters from './routers/AppRouters.jsx';

import store from './app/store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "'Inter', 'sans-serif'",
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<AppRouters />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
