import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import ItemSelector from '../forms/form-controllers/ItemSelector';

function InputHandlerForMeasurement({
	labelName,
	type,
	state,
	size,
	setState,
	placeholder,
	autoComplete,
	required,
	setMetrics,
}) {
	const metricArr = ['ft', 'mm', 'cm', 'm', 'Inch'];
	const [metric, setMetric] = useState('');

	function handleMetricsValue(value) {
		setMetric(value);
		setMetrics(value);
	}

	return (
		<Box
			variant='outlined'
			sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			<TextField
				required={required}
				type={type || 'text'}
				label={labelName}
				placeholder={placeholder}
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
					my: '4px',
				}}
			/>
			<Box sx={{ minWidth: '100px' }}>
				<ItemSelector
					size='medium'
					state={metric}
					setState={(value) => handleMetricsValue(value)}
					label='Metric'
					options={metricArr}
				/>
			</Box>
		</Box>
	);
}

export default InputHandlerForMeasurement;
