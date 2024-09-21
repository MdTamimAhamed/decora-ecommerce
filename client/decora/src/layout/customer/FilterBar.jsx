import { Box, Paper } from '@mui/material';
import React from 'react';

function FilterBar() {
	return (
		<Box>
			<Paper sx={{ width: '300px', height: '100vh' }} variant='outlined'>
				This is filter bar
			</Paper>
		</Box>
	);
}

export default FilterBar;
