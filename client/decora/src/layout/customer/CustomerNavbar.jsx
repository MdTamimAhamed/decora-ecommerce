import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';

function CustomerNavbar() {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography variant='h5'>Decora</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default CustomerNavbar;
