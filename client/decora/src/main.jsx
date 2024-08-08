import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AdminRoot from './layout/seller/SellerRoot.jsx';
import Products from './pages/seller/Products.jsx';
import Dashboard from './pages/seller/Dashboard.jsx';

import CustomerRoot from './layout/customer/CustomerRoot.jsx';
import CustomerSignup from './components/forms/signup/CustomerSignup.jsx';
import CustomerLogin from './components/forms/login/CustomerLogin.jsx';

import Home from './pages/customer/Home.jsx';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
	Navigate,
} from 'react-router-dom';

import store from './app/store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Home />} />

			<Route element={<CustomerRoot />}>
				<Route path='/login' element={<CustomerLogin />} />
				<Route path='/signup' element={<CustomerSignup />} />
			</Route>

			<Route path='/' element={<Navigate to='/products' replace />} />
			<Route path='/' element={<AdminRoot />}>
				<Route path='products' element={<Products />} />
				<Route path='dashboard' element={<Dashboard />} />
			</Route>

			{/* seller routes */}
			<Route path='/seller/signup' element={''} />
		</>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
