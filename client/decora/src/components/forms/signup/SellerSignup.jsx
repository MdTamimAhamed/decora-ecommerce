import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import InputHandler from '../form-controllers/InputHandler';
import ErrorMessage from '../form-controllers/ErrorMessage';
import { MuiOtpInput } from 'mui-one-time-password-input';
import ItemSelector from '../form-controllers/ItemSelector';
import { useNavigate } from 'react-router-dom';

function SellerSignup() {
	const theme = useTheme();
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [email, setEmail] = useState('');
	const [successEmail, setSuccessEmail] = useState('');

	const [otp, setOtp] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [businessType, setBusinessType] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorMsg, setError] = useState({});
	const [otpExpired, setOtpExpired] = useState(null);
	const [timeLeft, setTimeLeft] = useState(0);

	const handleOTP = (value) => {
		setOtp(value);
	};

	//for email verification
	async function handleVerifyEmail(e) {
		e.preventDefault();

		try {
			const response = await axios.post(`${baseUrl}/seller/verify-email`, {
				email,
			});
			if (response.status === 200) {
				const { message, email, otpExpire } = response.data;
				toast.success(message);
				setSuccessEmail(email);
				setOtpExpired(otpExpire);
				setTimeout(() => {
					setStep(2);
				}, 2000);
				setEmail('');
			} else {
				console.log('Verification failed!');
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
			} else {
				toast.error('Something went wrong! Try again.');
			}
		}
	}

	//for resending otp
	async function handleResendOTP(e) {
		e.preventDefault();
		try {
			const response = await axios.post(`${baseUrl}/seller/reset-otp`, {
				email: successEmail,
			});
			if (response.status === 200) {
				const { message, email, otpExpire } = response.data;
				toast.success(message);
				setSuccessEmail(email);
				setOtpExpired(otpExpire);
			} else {
				console.log('Verification failed!');
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
			} else {
				toast.error('Something went wrong! Try again.');
			}
		}
	}

	//for completing registration
	async function handleRegistration(e) {
		e.preventDefault();
		try {
			const response = await axios.post(`${baseUrl}/seller/register`, {
				email: successEmail,
				otpValue: otp,
				accountType: businessType,
				contactNumber,
				password,
				confirmPassword,
			});

			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				setTimeout(() => {
					navigate('/seller/login');
				}, 2000);
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
			} else {
				toast.error('Something went wrong! Try again.');
			}
		}
	}

	//resend otp interval
	useEffect(() => {
		let interval;
		if (otpExpired) {
			interval = setInterval(() => {
				const currentTime = new Date();
				const remainingTime = new Date(otpExpired) - currentTime;

				if (remainingTime <= 0) {
					clearInterval(interval);
					setTimeLeft(0);
				} else {
					setTimeLeft(Math.floor(remainingTime / 1000));
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [otpExpired]);

	const steps = ['Email verification', 'Complete registration'];

	return (
		<>
			<Box
				sx={{
					bgcolor: 'white',
					p: '30px',
					boxShadow: '0px 5px 15px rgba(0,0,0,0.15)',
				}}>
				<Box>
					{/* <---------------------step:1---------------------> */}
					{step === 1 && (
						<Box component='form' onSubmit={handleVerifyEmail}>
							<Box sx={{ mb: 2, width: '100%' }}>
								<Typography variant='h6' fontWeight='700'>
									Signup as Decora Seller
								</Typography>

								<Box>
									<Stepper activeStep={0}>
										{steps.map((label) => (
											<Step key={label}>
												<Typography
													variant='subtitle2'
													sx={{
														mt: '2px',
														lineHeight: '8px',
														fontSize: '0.8em',
														color: theme.palette.grey[500],
													}}>
													<StepLabel>{label}</StepLabel>
												</Typography>
											</Step>
										))}
									</Stepper>
								</Box>
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
						<Box component='form' onSubmit={handleRegistration}>
							<Box sx={{ mb: 2 }}>
								<Typography variant='h6' fontWeight='700'>
									Enter the OTP code
								</Typography>

								<Box>
									<Stepper activeStep={step}>
										{steps.map((label) => (
											<Step key={label}>
												<Typography
													variant='subtitle2'
													sx={{
														mt: '2px',
														lineHeight: '8px',
														fontSize: '0.8em',
														color: theme.palette.grey[500],
													}}>
													<StepLabel>{label}</StepLabel>
												</Typography>
											</Step>
										))}
									</Stepper>
								</Box>
							</Box>
							<Box sx={{ mb: '20px' }}>
								<Typography>
									Enter the 6-digit code sent to your email:
									<Typography
										component='span'
										variant='subtitle2'
										color='primary'>{`(${successEmail})`}</Typography>
								</Typography>
								<Box sx={{ padding: '30px' }}>
									<MuiOtpInput value={otp} onChange={handleOTP} length={6} />
								</Box>
								<Typography sx={{ textAlign: 'center' }}>
									Did not recieve code?
									<Button
										sx={{ textTransform: 'capitalize' }}
										onClick={handleResendOTP}>
										Re-send
										<Typography variant='subtitle2'>{`(${timeLeft}s)`}</Typography>
									</Button>
								</Typography>
							</Box>
							<ErrorMessage check={errorMsg.otpValue} />

							<ItemSelector
								label='Account Type'
								options={['Individual', 'Company']}
								state={businessType}
								setState={setBusinessType}
							/>
							<ErrorMessage check={errorMsg.accountType} />
							<InputHandler
								labelName='Contact Number'
								type='text'
								state={contactNumber}
								setState={setContactNumber}
								placeholder='Contact number ex: 01xxxxxxxxx'
							/>
							<ErrorMessage check={errorMsg.contactNumber} />
							<InputHandler
								labelName='Password'
								type='password'
								state={password}
								setState={setPassword}
								placeholder='Enter password'
							/>
							<ErrorMessage check={errorMsg.password} />
							<InputHandler
								labelName='Confirm password'
								type='password'
								state={confirmPassword}
								setState={setConfirmPassword}
								placeholder='Confirm password'
							/>
							<ErrorMessage check={errorMsg.confirmPassword} />
							<Button
								type='submit'
								variant='contained'
								fullWidth
								sx={{ py: 1, mt: 2 }}>
								Submit
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
					autoClose={2500}
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
