import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material';
import InputHandler from '../form-controllers/InputHandler';
import { Link } from 'react-router-dom';

function SellerSignup() {
	return (
		<>
			<Box sx={{ bgcolor: 'white', p: '30px' }}>
				Signup
				<InputHandler
					labelName='Account'
					type
					state
					setState
					placeholder
					autoComplete
				/>
				<InputHandler
					labelName='Email'
					type
					state
					setState
					placeholder
					autoComplete
				/>
				<Typography component={Link} to='/seller/login'>
					Seller login
				</Typography>
			</Box>
		</>
	);
}

export default SellerSignup;
