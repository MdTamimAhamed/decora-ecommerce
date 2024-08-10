import { Box, Button, Container, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import GenderSelectHandler from '../form-controllers/GenderSelectHandler';
import DateHandler from '../form-controllers/DateHandler';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomerSignup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [success, setSuccess] = useState('');
	const [errorMsg, setError] = useState('');

	async function handleFormSubmission(e) {
		e.preventDefault();

		const formData = {
			userName: username,
			email,
			phoneNumber,
			gender,
			birthday: dob,
			password,
			confirmPassword,
		};

		try {
			const response = await axios.post(
				`${baseUrl}/customer/signup`,
				formData,
				{
					headers: {
						'Content-Type': 'Application/json',
					},
				}
			);

			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				setTimeout(() => {
					window.location.href = '';
				}, 1500);
			}
		} catch (error) {
			if (error.response && error.response.data.error) {
				setError(error.response.data.errors);
				toast.error(errorMsg);
			} else {
				toast.error('Signup failed!');
			}
		}
	}

	return (
		<>
			<Box>
				<Container maxWidth='xl'>
					<Box
						sx={{
							margin: '0 auto',
							maxWidth: '850px',
							mt: '2rem',
						}}>
						<Typography variant='h5' py='20px' fontWeight='500'>
							Create account
						</Typography>

						<Box
							component='form'
							onSubmit={handleFormSubmission}
							bgcolor='white'
							padding='40px'
							sx={{ boxShadow: '0px 3px 10px rgba(0,0,0,0.1)' }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: 6,
								}}>
								{/* left column */}
								<Box flexBasis='50%'>
									<InputHandler
										state={username}
										setState={setUsername}
										labelName='Username'
										placeholder='Username'
										autoComplete='nope'
										type='text'
									/>
									<InputHandler
										type='email'
										state={email}
										setState={setEmail}
										labelName='Email'
										placeholder='Email'
										autoComplete='email'
									/>
									<InputHandler
										state={phoneNumber}
										setState={setPhoneNumber}
										labelName='Phone number'
										placeholder='Phone number'
										autoComplete='nope'
									/>
									<GenderSelectHandler state={gender} setState={setGender} />
									<DateHandler label='Date of Birth' setState={setDob} />
									<InputHandler
										type='password'
										state={password}
										setState={setPassword}
										labelName='Password'
										placeholder='Password'
									/>
									<InputHandler
										type='password'
										state={confirmPassword}
										setState={setConfirmPassword}
										labelName='Confirm password'
										placeholder='Confirm password'
									/>
									<Button
										fullWidth
										type='submit'
										variant='contained'
										sx={{ mt: '20px', py: '8px' }}>
										Signup
									</Button>
								</Box>

								{/* right column */}
								<Box flexBasis='50%'>
									<Divider>
										<Box>
											<Typography variant='subtitle2'>
												Or signup with
											</Typography>
										</Box>
									</Divider>
									<Button
										variant='outlined'
										fullWidth
										sx={{
											textTransform: 'capitalize',
											mt: '10px',
											py: '5px',
											gap: 1,
										}}>
										<FcGoogle fontSize='20px' />
										<Typography variant='subtitle1' color='inherit'>
											Google
										</Typography>
									</Button>
									<Typography variant='subtitle2' sx={{ mt: '20px' }}>
										Already have an account?{' '}
										<Typography
											component={Link}
											to='/login'
											color='primary'
											variant='subtitle2'
											sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
											Login
										</Typography>
									</Typography>
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
							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default CustomerSignup;
