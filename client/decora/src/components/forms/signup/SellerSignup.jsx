import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import InputHandler from '../form-controllers/InputHandler';

function SellerSignup() {
	const theme = useTheme();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');
	const [contactNumber, setContactNumber] = useState('');

	async function handleVerifyEmail(e) {
		e.preventDefault();

		try {
			const response = await axios.post(`${baseUrl}/seller/verify-email`, {
				email,
			});
			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				setTimeout(() => {
					setStep(2);
				}, 3000);
			} else {
				console.log('Verification failed!');
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Box sx={{ bgcolor: 'white', p: '30px' }}>
				<Box sx={{ mb: 2 }}>
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
				<Box>
					{/* <---------------------step:1---------------------> */}
					{step === 1 && (
						<Box component='form' onSubmit={handleVerifyEmail}>
							<InputHandler
								labelName='Email'
								type='email'
								state={email}
								setState={setEmail}
								placeholder='Enter your email'
							/>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								sx={{ py: 1, mt: 2 }}>
								Verify Email
							</Button>
						</Box>
					)}
				</Box>

				{/* <---------------------step:2---------------------> */}
				<Box>
					{step === 2 && (
						<Box component='form'>
							<InputHandler
								labelName='Email'
								type='email'
								state={email}
								setState={setEmail}
								placeholder='Enter your email'
							/>
							<InputHandler
								labelName='Contact Number'
								type='text'
								state={contactNumber}
								setState={setContactNumber}
								placeholder='Enter your email'
							/>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								sx={{ py: 1, mt: 2 }}>
								Verify Email
							</Button>
						</Box>
					)}
				</Box>
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
