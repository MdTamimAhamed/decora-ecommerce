import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material';

const StyledBackgroundImage = styled(Box)(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '600px',
	backgroundImage: 'url(/src/assets/seller_hero.jpg)',
	backgroundSize: 'cover',
	backgroundPositionY: ' 40%',
	backgroundRepeat: 'no-repeat',
}));
const Overlay = styled(Box)(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0,0,0,0.3)',
}));

function SellerSignup() {
	return (
		<>
			<Box>
				<Box sx={{ position: 'relative', width: '100%', height: '600px' }}>
					<StyledBackgroundImage />
					<Overlay>
						<Container maxWidth='xl'>
							<Typography variant='h6' color='white'>
								Banglaesh
							</Typography>
						</Container>
					</Overlay>
				</Box>
				<h1>Test</h1>
			</Box>
		</>
	);
}

export default SellerSignup;
