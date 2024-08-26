import { Box, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Orders() {
	return (
		<Box>
			<Typography>Order page</Typography>
			<Outlet />
		</Box>
	);
}

export default Orders;
