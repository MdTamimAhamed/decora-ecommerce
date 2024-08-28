import { TextField } from '@mui/material';
import React from 'react';

function InputHandler({
	labelName,
	type,
	state,
	size,
	setState,
	placeholder,
	autoComplete,
	required,
}) {
	return (
		<>
			<TextField
				required={required}
				type={type || 'text'}
				label={labelName}
				placeholder={placeholder}
				id='outlined-basic'
				variant='outlined'
				size={size || 'small'}
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
						fontSize: '1rem',
					},
					my: '10px',
				}}
			/>
		</>
	);
}

export default InputHandler;
