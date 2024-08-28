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
				<Container
					maxWidth='xl'
					sx={{
						height: '95vh',
						overflowY: 'auto',
						'&::-webkit-scrollbar': {
							width: '4px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#f1f1f1',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#ccc',

							borderRadius: '0px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: '#bbb',
						},
					}}>
					<Outlet />
				</Container>
			</Box>
		</Box>
	);
}

export default SellerDashboardRoot;
