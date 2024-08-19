import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { sellerLogout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Products() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		dispatch(sellerLogout());
		setTimeout(() => {
			navigate('/seller/login');
		}, 1000);
	}

	return (
		<Box>
			<Typography color='primary'>Hello world</Typography>
			<Button variant='outlined' onClick={handleLogout}>
				Logout
			</Button>
		</Box>
	);
}

export default Products;
