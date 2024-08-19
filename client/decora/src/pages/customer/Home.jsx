import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import CustomerNavbar from '../../layout/customer/CustomerNavbar';

function Home() {
	return (
		<>
			<CustomerNavbar />
			<Box>
				<Container maxWidth='xl'>
					<Typography>This is public home</Typography>
				</Container>
			</Box>
		</>
	);
}

export default Home;
