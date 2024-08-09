import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import { Box } from '@mui/material';

function CustomerRoot({ children }) {
	return (
		<>
			<Box sx={{ backgroundColor: '#EFF0F5', height: '100vh' }}>
				<CustomerNavbar />
				<Box>
					<Outlet />
				</Box>
			</Box>
		</>
	);
}

export default CustomerRoot;
