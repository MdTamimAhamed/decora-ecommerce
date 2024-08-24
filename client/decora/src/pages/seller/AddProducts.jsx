import { useTheme } from '@emotion/react';
import { alpha, Box, Button, Paper, Typography } from '@mui/material';

function AddProducts() {
	const theme = useTheme();

	return (
		<Box>
			<Paper
				variant='outlined'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '150px',
					borderStyle: 'dashed',
					borderWidth: '2px',
					bgcolor: alpha(theme.palette.primary.main, 0.1),
					borderColor: alpha(theme.palette.primary.main, 0.5),
					mt: 3,
				}}>
				<Button variant='outlined' sx={{ padding: '10px' }}>
					Add Products +
				</Button>
			</Paper>
			<Paper sx={{ mt: 2, height: '200px' }}>Product list</Paper>
		</Box>
	);
}

export default AddProducts;
