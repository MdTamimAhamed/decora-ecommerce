import React from 'react';
import '../index.css';

import Product from '../pages/customer/Product.jsx';
import Products from '../pages/seller/Products/Products.jsx';
import MyStore from '../pages/seller/MyStore.jsx';
import Dashboard from '../pages/seller/Dashboard.jsx';
import AddProducts from '../pages/seller/Products/AddProducts.jsx';
import EditProducts from '../pages/seller/Products/EditProducts.jsx';
import ManageProducts from '../pages/seller/ManageProducts/ManageProducts.jsx';
import Orders from '../pages/seller/Orders/Orders.jsx';
import ManageOrders from '../pages/seller/Orders/ManageOrders.jsx';
import ProductPreview from '../pages/seller/myStore/ProductPreview.jsx';
import ProductDetails from '../components/ui/product/ProductDetails.jsx';

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
import Cart from '../components/ui/product/Cart.jsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Home />} />
			<Route path='/cart' element={<Cart />} />
			<Route path='/product' element={<Product />} />
			<Route path='/product/:prod_id' element={<ProductDetails />} />

			<Route element={<CustomerRoot />} replace>
				<Route path='/login' element={<CustomerLogin />} />
				<Route path='/signup' element={<CustomerSignup />} />
			</Route>

			{/* seller routes */}
			<Route path='/' element={<SellerRoot />} replace>
				<Route path='seller-login' element={<SellerLogin />} />
				<Route path='seller-register' element={<SellerSignup />} />
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
				<Route path='products/add-products' element={<AddProducts />} />

				<Route path='manage-products' element={<ManageProducts />} />
				<Route
					path='/manage-products/edit/:prod_id'
					element={<EditProducts />}
				/>

				<Route path='/store/:prod_id' element={<ProductPreview />} />

				<Route path='orders' element={<Orders />}>
					<Route path='manage-orders' element={<ManageOrders />} />
				</Route>
				<Route path='store' element={<MyStore />} />
				<Route path='dashboard' element={<Dashboard />} />
			</Route>
		</>
	)
);

function AppRouters() {
	return <RouterProvider router={router} />;
}

export default AppRouters;
