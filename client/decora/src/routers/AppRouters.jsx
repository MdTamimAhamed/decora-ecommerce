import React from 'react';
import '../index.css';

import Products from '../pages/seller/Products.jsx';
import Dashboard from '../pages/seller/Dashboard.jsx';

import CustomerRoot from '../layout/customer/CustomerRoot.jsx';
import CustomerSignup from '../components/forms/signup/CustomerSignup.jsx';
import CustomerLogin from '../components/forms/login/CustomerLogin.jsx';

import SellerRoot from '../layout/seller/SellerRoot.jsx';
import SellerSignup from '../components/forms/signup/SellerSignup.jsx';
import SellerLogin from '../components/forms/login/SellerLogin.jsx';
import SellerDashboardRoot from '../layout/seller/SellerDashboardRoot.jsx';

import Home from '../pages/customer/Home.jsx';
import PrivateRoute from '../components/authGuard/PrivateRoute.jsx';

import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
	Navigate,
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Home />} />

			<Route element={<CustomerRoot />}>
				<Route path='/login' element={<CustomerLogin />} />
				<Route path='/signup' element={<CustomerSignup />} />
			</Route>

			{/* seller routes */}
			<Route path='/seller' element={<SellerRoot />} replace>
				<Route path='login' element={<SellerLogin />} />
				<Route path='register' element={<SellerSignup />} />
			</Route>

			<Route
				path='/'
				element={
					<PrivateRoute>
						<SellerDashboardRoot />
					</PrivateRoute>
				}
				replace>
				<Route path='products' element={<Products />} />
				<Route path='dashboard' element={<Dashboard />} />
			</Route>
		</>
	)
);

function AppRouters() {
	return <RouterProvider router={router} />;
}

export default AppRouters;
