import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

import InputHandler from '../form-controllers/InputHandler';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../form-controllers/ErrorMessage';
import { useDispatch } from 'react-redux';
import { sellerLogin, seller } from '../../../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

function SellerLogin() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setError] = useState({});

	const dispatch = useDispatch();

	async function handleSellerLogin(e) {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${baseUrl}/seller/login`,
				{ email, password },
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (response.status === 200) {
				const { message, token } = response.data;
				if (token) {
					dispatch(sellerLogin({ sellerToken: token }));
					dispatch(seller({ sellerInfo: jwtDecode(token) }));
				}
				toast.success(message);
				setTimeout(() => {
					navigate('/products');
				}, 2000);
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
			} else {
				toast.error(error.response.data.message);
			}
		}
	}

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSellerLogin}
				sx={{ bgcolor: 'white', p: '30px' }}>
				<Typography variant='h6' fontWeight='600' mb={2}>
					Seller Login
				</Typography>
				<InputHandler
					labelName='Email'
					type='email'
					state={email}
					setState={setEmail}
					placeholder='Enter your email'
				/>
				<ErrorMessage check={errMsg.email} />
				<InputHandler
					labelName='Password'
					type='password'
					state={password}
					setState={setPassword}
					placeholder='Enter password'
				/>
				<ErrorMessage check={errMsg.password} />

				<Button
					type='submit'
					variant='contained'
					fullWidth
					sx={{ mt: '10px', mb: '20px', py: '8px' }}>
					Login
				</Button>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Typography
						sx={{
							textDecoration: 'none',
							'&:hover': { cursor: 'pointer', textDecoration: 'underline' },
						}}
						color='primary'>
						Reset password
					</Typography>

					<Typography
						sx={{
							textDecoration: 'none',
							'&:hover': { cursor: 'pointer', textDecoration: 'underline' },
							mt: 1,
						}}
						component={Link}
						color='primary'
						to='/seller/register'>
						Create a new account
					</Typography>
				</Box>
			</Box>
		</>
	);
}

export default SellerLogin;
