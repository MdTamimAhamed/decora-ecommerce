import { MenuItem, MenuList, TextField } from '@mui/material';
import React from 'react';

function InputHandler({
	value,
	labelName,
	type,
	state,
	size,
	setState,
	placeholder,
	autoComplete,
	required,
	margin,
	disabled,
}) {
	return (
		<>
			<TextField
				required={required}
				type={type || 'text'}
				label={labelName}
				disabled={disabled || false}
				placeholder={placeholder}
				variant='outlined'
				size={size || 'small'}
				fullWidth
				margin='dense'
				value={state || ''}
				onChange={(e) => setState(e.target.value)}
				autoComplete={autoComplete}
				InputLabelProps={{
					shrink: true,
				}}
				sx={{
					'& .MuiInputBase-input::placeholder': {
						fontSize: '1rem',
					},
					my: `${margin}px` || '10px',
				}}
			/>
		</>
	);
}

export default InputHandler;
