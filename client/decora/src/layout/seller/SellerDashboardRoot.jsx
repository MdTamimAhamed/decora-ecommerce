import React from 'react';
import DashboardNavbar from './DashboardNavbar';
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function SellerDashboardRoot() {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
			}}>
			<Sidebar />
			<Box sx={{ width: '100%' }}>
				<DashboardNavbar />
				<Container maxWidth='xl'>
					<Outlet />
				</Container>
			</Box>
		</Box>
	);
}

export default SellerDashboardRoot;
