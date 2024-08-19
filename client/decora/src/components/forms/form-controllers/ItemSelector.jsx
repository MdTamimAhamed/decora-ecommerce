import { TextField, MenuItem } from '@mui/material';

function ItemSelector({ state, setState, label, options }) {
	return (
		<>
			<TextField
				label={label || ''}
				variant='outlined'
				defaultValue='Select'
				size='small'
				fullWidth
				margin='dense'
				value={state}
				onChange={(e) => setState(e.target.value)}
				sx={{ my: '10px' }}
				select>
				{options.map((item, index) => (
					<MenuItem key={index} value={item}>
						{item}
					</MenuItem>
				))}
			</TextField>
		</>
	);
}

export default ItemSelector;
