import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import GenderSelectHandler from '../form-controllers/GenderSelectHandler';
import DateHandler from '../form-controllers/DateHandler';

function CustomerSignup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<>
			<Box>
				<Container maxWidth='xl'>
					<Box sx={{ margin: '0 auto', maxWidth: '768px', mt: '4rem' }}>
						<Typography variant='h5' py='20px' fontWeight='500'>
							Create account
						</Typography>
						<Box component='form' bgcolor='white' padding='40px'>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: 4,
								}}>
								<Box flexBasis='50%'>
									<InputHandler
										state={username}
										setState={setUsername}
										labelName='Username'
										placeholder='Username'
									/>
									<InputHandler
										state={email}
										setState={setEmail}
										labelName='Email'
										placeholder='Email'
									/>
									<InputHandler
										state={phoneNumber}
										setState={setPhoneNumber}
										labelName='Phone number'
										placeholder='Phone number'
									/>
									<GenderSelectHandler state={gender} setState={setGender} />
									<DateHandler label='Date of Birth' />
								</Box>
								<Box flexBasis='50%'>
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
										variant='contained'
										sx={{ mt: '20px', py: '8px' }}>
										Signup
									</Button>
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
