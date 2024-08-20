import {
	Box,
	Button,
	Divider,
	Paper,
	Step,
	StepLabel,
	Stepper,
	styled,
	Typography,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';
import InputHandler from '../../components/forms/form-controllers/InputHandler';
import InputFileUpload from '../../components/reuseables/InputFileUpload';
import { alpha } from '@mui/material';

const StyledBackgroundImage = styled(Box)(() => ({
	marginTop: '20px',
	width: '100%',
	height: '200px',
	backgroundImage: 'url(src/assets/dashboard_product_image.jpg)',
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
	backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
}));

function Products() {
	const theme = useTheme();
	const steps = [
		'Store Setup',
		'Address Verification',
		'NID Verification',
		'Bank Details',
	];
	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<StyledBackgroundImage />
				<Overlay>
					<Box padding={4}>
						<Typography variant='h4' fontWeight={700} color='white'>
							Product Creation
						</Typography>
						<Typography color='white'>
							Instently create product and showcase it on your store!
						</Typography>
						<Button
							disableElevation={true}
							variant='contained'
							sx={{
								bgcolor: 'white',
								color: 'black',
								marginTop: '25px',
								fontWeight: 600,
								'&:hover': {
									color: theme.palette.primary.main,
									bgcolor: 'white',
								},
							}}>
							Add Products +
						</Button>
					</Box>
				</Overlay>
			</Box>

			<Box sx={{ width: '100%' }}>
				<Divider sx={{ mt: '20px' }} />
				<Typography
					variant='h6'
					color='error'
					sx={{ textAlign: 'center', my: '40px', fontWeight: '600' }}>
					Please complete the following steps to add your first product to the
					store!
				</Typography>
				<Box sx={{ mt: 4 }}>
					<Stepper activeStep={0} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<Typography
									variant='subtitle2'
									sx={{
										mt: '2px',
										lineHeight: '8px',
										fontSize: '0.8em',
										color: theme.palette.grey[500],
									}}>
									<StepLabel>{label}</StepLabel>
								</Typography>
							</Step>
						))}
					</Stepper>

					<Paper variant='outlined' sx={{ mt: 6 }}>
						<Box sx={{ maxWidth: '768px', margin: 'auto', padding: '30px' }}>
							<Typography variant='h6' fontWeight={500}>
								Store Information
							</Typography>
							<Box sx={{ display: 'flex', gap: 3 }}>
								<InputHandler
									labelName='Store Name'
									type='text'
									placeholder='Enter store name'
									autoComplete='nope'
								/>
								<InputHandler
									labelName='Store Subtitle'
									type='text'
									placeholder='Subtitle/tag/slogun'
									autoComplete='nope'
								/>
							</Box>

							<Typography variant='subtitle2'>
								Upload Store/Profile Image
							</Typography>
							<Paper
								variant='outlined'
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '40px',
									bgcolor: alpha(theme.palette.primary.main, 0.1),
									mt: '2px',
									borderStyle: 'dashed',
								}}>
								<InputFileUpload />
							</Paper>
							<Button variant='contained' sx={{ mt: 2 }}>
								Next
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export default Products;
