import { TextField, MenuItem } from '@mui/material';
import { useId } from 'react';

function ItemSelector({ state, setState, size, label, options }) {
	const id = useId();
	return (
		<>
			<TextField
				id={id}
				label={label || ''}
				variant='outlined'
				defaultValue='Select'
				size={size || 'small'}
				name='select'
				fullWidth
				margin='dense'
				value={state || ''}
				onChange={(e) => setState(e.target.value)}
				sx={{ my: '10px' }}
				select
				SelectProps={{
					MenuProps: {
						disableScrollLock: true,
						marginThreshold: null,
					},
				}}>
				{options
					? options.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
					  ))
					: null}
			</TextField>
		</>
	);
}

export default ItemSelector;
