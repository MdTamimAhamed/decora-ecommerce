import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSignupEmailForm from './SellerSignupEmailForm';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';

function SellerSignup() {
	const theme = useTheme();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');

	async function handleEmailFormSubmission(e) {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${baseUrl}/seller/verify-email`,
				email
			);
			if (response.status === '200') {
				setStep(2);
			} else {
				return re;
			}
		} catch (error) {}
	}

	return (
		<>
			<Box sx={{ bgcolor: 'white', p: '30px' }}>
				<Box
					component='form'
					onSubmit={handleEmailFormSubmission}
					sx={{ mb: 2 }}>
					<Typography variant='h6'>Signup as Decora Seller</Typography>
					<Typography
						variant='subtitle2'
						sx={{
							mt: '2px',
							lineHeight: '8px',
							fontSize: '0.8em',
							color: theme.palette.grey[500],
						}}>
						signup in 2 steps.
					</Typography>
				</Box>
				<Box>{step === 1 && <SellerSignupEmailForm />}</Box>

				<Box sx={{ mt: 3 }}>
					<Typography
						color='primary'
						sx={{
							textDecoration: 'none',
							'&:hover': { textDecoration: 'underline', cursor: 'pointer' },
						}}
						component={Link}
						to='/seller/login'>
						Seller login
					</Typography>
				</Box>
			</Box>
		</>
	);
}

export default SellerSignup;
