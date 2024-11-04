import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const OrderQuantity = ({ state, setState, maxQuantity, minQuantity }) => {
	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Button
					size='small'
					sx={{ fontSize: '16px' }}
					variant='outlined'
					onClick={() => setState(Math.max(minQuantity, state - 1))}
					disabled={state <= minQuantity}>
					-
				</Button>
				<Typography variant='body1'>{state}</Typography>
				<Button
					size='small'
					sx={{ fontSize: '16px' }}
					variant='outlined'
					onClick={() => setState(Math.min(maxQuantity, state + 1))}
					disabled={state >= maxQuantity}>
					+
				</Button>
			</Box>
		</>
	);
};

export default OrderQuantity;
