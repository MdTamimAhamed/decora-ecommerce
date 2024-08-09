import { TextField, MenuItem, Select } from '@mui/material';
import React from 'react';

function GenderSelectHandler({ state, setState }) {
	return (
		<>
			<TextField
				label='Gender'
				variant='outlined'
				placeholder='Gender'
				size='small'
				fullWidth
				margin='dense'
				value={state}
				onChange={(e) => setState(e.target.value)}
				InputLabelProps={{
					shrink: true,
				}}
				select>
				<MenuItem value='Male'>Male</MenuItem>
				<MenuItem value='Female'>Female</MenuItem>
				<MenuItem value='Other'>Other</MenuItem>
			</TextField>
		</>
	);
}

export default GenderSelectHandler;
