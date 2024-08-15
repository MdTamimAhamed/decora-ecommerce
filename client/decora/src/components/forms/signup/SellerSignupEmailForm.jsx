import React, { useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';

function SellerSignupEmailForm() {
	const [email, setEmail] = useState('');

	return (
		<>
			<Box component='form'>
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
		</>
	);
}

export default SellerSignupEmailForm;
