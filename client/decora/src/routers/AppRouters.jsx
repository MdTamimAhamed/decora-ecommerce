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
import PublicRoute from '../components/authGuard/PublicRoute.jsx';

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
				<Route
					path='/login'
					element={
						<PublicRoute>
							<CustomerLogin />
						</PublicRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<PublicRoute>
							<CustomerSignup />
						</PublicRoute>
					}
				/>
			</Route>

			<Route path='/' element={<SellerDashboardRoot />} replace>
				<Route path='products' element={<Products />} />
				<Route path='dashboard' element={<Dashboard />} />
			</Route>

			{/* seller routes */}
			<Route path='/seller' element={<SellerRoot />} replace>
				<Route
					path='login'
					element={
						<PublicRoute>
							<SellerLogin />
						</PublicRoute>
					}
				/>
				<Route path='register' element={<SellerSignup />} />
			</Route>
		</>
	)
);

function AppRouters() {
	return <RouterProvider router={router} />;
}

export default AppRouters;
