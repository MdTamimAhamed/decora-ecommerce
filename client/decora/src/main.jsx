import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AdminRoot from './layout/admin/AdminRoot';
import Products from './pages/admin/Products';
import Dashboard from './pages/admin/Dashboard';

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
			<Route path='/' element={<Navigate to='/products' replace />} />
			<Route path='/' element={<AdminRoot />}>
				<Route path='products' element={<Products />} />
				<Route path='dashboard' element={<Dashboard />} />
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
