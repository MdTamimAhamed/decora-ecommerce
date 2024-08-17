import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import InputHandler from '../form-controllers/InputHandler';
import ErrorMessage from '../form-controllers/ErrorMessage';
import { MuiOtpInput } from 'mui-one-time-password-input';

function SellerSignup() {
	const theme = useTheme();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');

	const [otp, setOtp] = useState('');
	const [contactNumber, setContactNumber] = useState('');

	const [errorMsg, setError] = useState({});

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
				setEmail('');
			} else {
				console.log('Verification failed!');
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
			} else {
				toast.error('Something went wrong!');
			}
		}
	}

	const handleOTP = (value) => {
		console.log(value);
		setOtp(value);
	};

	return (
		<>
			<Box sx={{ bgcolor: 'white', p: '30px' }}>
				<Box>
					{/* <---------------------step:1---------------------> */}
					{step === 1 && (
						<Box component='form' onSubmit={handleVerifyEmail}>
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
									Step:1
								</Typography>
							</Box>
							<InputHandler
								labelName='Email'
								type='email'
								state={email}
								setState={setEmail}
								placeholder='Enter your email'
							/>
							<ErrorMessage check={errorMsg.email} />
							<Button
								type='submit'
								variant='contained'
								fullWidth
								sx={{ py: 1, mt: 2 }}>
								Verify Email
							</Button>
							<Box sx={{ mt: 3 }}>
								<Typography
									color='primary'
									sx={{
										textDecoration: 'none',
										'&:hover': {
											textDecoration: 'underline',
											cursor: 'pointer',
										},
									}}
									component={Link}
									to='/seller/login'>
									Seller login
								</Typography>
							</Box>
						</Box>
					)}
				</Box>

				{/* <---------------------step:2---------------------> */}
				<Box>
					{step === 2 && (
						<Box component='form'>
							<Box sx={{ mb: 2 }}>
								<Typography variant='h6'>Enter the OTP code</Typography>
								<Typography
									variant='subtitle2'
									sx={{
										mt: '2px',
										lineHeight: '8px',
										fontSize: '0.8em',
										color: theme.palette.grey[500],
									}}>
									Step:2
								</Typography>
							</Box>
							<MuiOtpInput value={otp} onChange={handleOTP} length={6} />
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
							<Button
								onClick={() => setStep(1)}
								variant='outlined'
								sx={{ mt: 2 }}>
								Back
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
			</Box>
		</>
	);
}

export default SellerSignup;
