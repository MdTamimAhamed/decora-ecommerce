import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import InputHandler from '../form-controllers/InputHandler';

function AddressVerification() {
	const dispatch = useDispatch();

	return (
		<Box>
			<InputHandler labelName='Address verification' />
		</Box>
	);
}

export default AddressVerification;
