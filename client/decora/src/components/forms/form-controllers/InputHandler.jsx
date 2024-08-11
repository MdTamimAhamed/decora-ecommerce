import { TextField } from '@mui/material';
import React from 'react';

function InputHandler({
	labelName,
	type,
	state,
	setState,
	placeholder,
	autoComplete,
}) {
	return (
		<>
			<TextField
				type={type || 'text'}
				label={labelName}
				placeholder={placeholder}
				id='outlined-basic'
				variant='outlined'
				size='small'
				fullWidth
				margin='dense'
				value={state}
				onChange={(e) => setState(e.target.value)}
				autoComplete={autoComplete}
				InputLabelProps={{
					shrink: true,
				}}
				sx={{
					'& .MuiInputBase-input::placeholder': {
						fontSize: '0.95rem',
					},
					my: '10px',
				}}
			/>
		</>
	);
}

export default InputHandler;
