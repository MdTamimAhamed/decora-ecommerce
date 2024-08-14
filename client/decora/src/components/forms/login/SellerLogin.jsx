import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material';
import InputHandler from '../form-controllers/InputHandler';
import { Link } from 'react-router-dom';

function SellerLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<Box sx={{ bgcolor: 'white', p: '30px' }}>
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
				<InputHandler
					labelName='Password'
					type='password'
					state={password}
					setState={setPassword}
					placeholder='Enter password'
				/>

				<Button
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
