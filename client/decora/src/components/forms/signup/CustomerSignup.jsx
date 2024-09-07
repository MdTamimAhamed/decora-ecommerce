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
import ErrorMessage from '../form-controllers/ErrorMessage';
import { useAuth0 } from '@auth0/auth0-react';

function CustomerSignup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState(null);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errorMsg, setError] = useState({});

	const { loginWithRedirect } = useAuth0();

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
					window.location.href = '/login';
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
									<ErrorMessage check={errorMsg.userName} />
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
										state={phoneNumber}
										setState={setPhoneNumber}
										labelName='Phone number'
										placeholder='Phone number'
										autoComplete='nope'
									/>
									<ErrorMessage check={errorMsg.phoneNumber} />
									<GenderSelectHandler state={gender} setState={setGender} />
									<ErrorMessage check={errorMsg.gender} />
									<DateHandler label='Date of Birth' setState={setDob} />
									<ErrorMessage check={errorMsg.birthday} />
									<InputHandler
										type='password'
										state={password}
										setState={setPassword}
										labelName='Password'
										placeholder='Password'
									/>
									<ErrorMessage check={errorMsg.password} />
									<InputHandler
										type='password'
										state={confirmPassword}
										setState={setConfirmPassword}
										labelName='Confirm password'
										placeholder='Confirm password'
									/>
									<ErrorMessage check={errorMsg.confirmPassword} />
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
