import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../layout/customer/CustomerNavbar';

function Home() {
	// const { logout } = useAuth0();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		dispatch(logout());
		toast.success('You logged out!');
		navigate('/');
	}

	return (
		<>
			<CustomerNavbar />
			<Box>
				<Container maxWidth='xl'>
					<Typography>This is home after login.</Typography>
					<Button variant='contained' color='error' onClick={handleLogout}>
						Logout
					</Button>
					<ToastContainer
						position='top-center'
						autoClose={1500}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable={false}
						pauseOnHover
						theme='dark'
					/>
				</Container>
			</Box>
		</>
	);
}

export default Home;
