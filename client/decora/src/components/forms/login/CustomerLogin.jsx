import { Box, Button, Container, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from '../form-controllers/ErrorMessage';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/auth/authSlice';

function CustomerLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errorMsg, setError] = useState({});

	const { loginWithRedirect } = useAuth0();
	const dispatch = useDispatch();

	async function handleFormSubmission(e) {
		e.preventDefault();

		const formData = {
			email,
			password,
		};

		try {
			const response = await axios.post(`${baseUrl}/customer/login`, formData, {
				headers: {
					'Content-Type': 'Application/json',
				},
			});

			if (response.status === 200) {
				const { message, token } = response.data;
				toast.success(message);

				if (token) {
					dispatch(login({ token }));
				}
				setTimeout(() => {
					window.location.href = '/';
				}, 1500);
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				setError(error.response.data.errors);
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
							maxWidth: '400px',
							mt: '2rem',
						}}>
						<Typography variant='h5' py='20px' fontWeight='500'>
							Login
						</Typography>

						<Box
							component='form'
							onSubmit={handleFormSubmission}
							bgcolor='white'
							padding='40px'
							sx={{ boxShadow: '0px 3px 10px rgba(0,0,0,0.1)' }}>
							<Box
								sx={{
									gap: 6,
								}}>
								<Box>
									<InputHandler
										type='email'
										state={email}
										setState={setEmail}
										labelName='Email'
										placeholder='Email'
										autoComplete='email'
									/>
									<ErrorMessage check={errorMsg.email} />

									<InputHandler
										type='password'
										state={password}
										setState={setPassword}
										labelName='Password'
										placeholder='Password'
									/>
									<ErrorMessage check={errorMsg.password} />

									<Button
										fullWidth
										type='submit'
										variant='contained'
										sx={{ mt: '20px', py: '8px' }}>
										Login
									</Button>

									<Divider sx={{ mt: '20px' }}>
										<Box>
											<Typography variant='subtitle2'>
												Or signin with
											</Typography>
										</Box>
									</Divider>

									<Button
										onClick={() => loginWithRedirect()}
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
										Create an account{' '}
										<Typography
											component={Link}
											to='/signup'
											color='primary'
											variant='subtitle2'
											sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
											Signup
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

export default CustomerLogin;
