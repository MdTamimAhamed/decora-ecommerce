import {
	Box,
	Button,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputHandler from '../form-controllers/InputHandler';
import { handleSteps } from '../../../features/seller/sellerVerificationSlice';
import CountrySelector from '../../reuseables/CountrySelector';

import { toast, ToastContainer } from 'react-toastify';

function AddressVerification() {
	const dispatch = useDispatch();

	const [country, setCountry] = useState('');
	const [district, setDistrict] = useState('');
	const [area, setArea] = useState('');

	console.log(country, district);

	return (
		<Box
			component='form'
			sx={{ maxWidth: '768px', margin: 'auto', padding: '30px' }}>
			<Typography variant='h6' mb={1} fontWeight={500}>
				Address Verification
			</Typography>
			<Box>
				<CountrySelector
					size='small'
					selectOption='country'
					label='Choose a country'
					setState={setCountry}
				/>
				<CountrySelector
					size='small'
					selectOption='district'
					label='Select your district'
					state={district}
					setState={setDistrict}
				/>
				{/* <CountrySelector
					size='small'
					selectOption='area'
					label='Select your area/city'
					setState={setArea}
				/> */}

				<Button
					variant='outlined'
					onClick={() => dispatch(handleSteps({ step: 0 }))}>
					Back
				</Button>
			</Box>

			<Button variant='contained' sx={{ mt: 2 }}>
				Next
			</Button>

			<ToastContainer
				position='bottom-right'
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
	);
}

export default AddressVerification;
