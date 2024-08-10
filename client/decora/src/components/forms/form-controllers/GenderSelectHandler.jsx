import { TextField, MenuItem } from '@mui/material';
import React from 'react';

function GenderSelectHandler({ state, setState }) {
	return (
		<>
			<TextField
				label='Gender'
				variant='outlined'
				defaultValue='Select'
				size='small'
				fullWidth
				margin='dense'
				value={state}
				onChange={(e) => setState(e.target.value)}
				sx={{ my: '10px' }}
				select>
				<MenuItem value='Male'>Male</MenuItem>
				<MenuItem value='Female'>Female</MenuItem>
				<MenuItem value='Other'>Other</MenuItem>
			</TextField>
		</>
	);
}

export default GenderSelectHandler;
