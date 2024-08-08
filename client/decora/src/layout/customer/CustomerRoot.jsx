import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';

function CustomerRoot({ children }) {
	return (
		<>
			<CustomerNavbar />
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default CustomerRoot;
