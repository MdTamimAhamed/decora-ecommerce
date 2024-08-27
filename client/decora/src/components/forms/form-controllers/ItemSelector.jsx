import { TextField, MenuItem } from '@mui/material';

function ItemSelector({ state, setState, size, label, options }) {
	return (
		<>
			<TextField
				label={label || ''}
				variant='outlined'
				defaultValue='Select'
				size={size || 'small'}
				fullWidth
				margin='dense'
				value={state || ''}
				onChange={(e) => setState(e.target.value)}
				sx={{ my: '10px' }}
				select>
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
