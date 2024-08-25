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
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import StoreSetup from '../../../components/forms/seller-product-forms/StoreSetup';
import AddressVerification from '../../../components/forms/seller-product-forms/AddressVerification';
import NIDVerification from '../../../components/forms/seller-product-forms/NIDVerification';
import BankDetails from '../../../components/forms/seller-product-forms/BankDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import AddProducts from './AddProducts';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';

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
	const [isSellerVerified, setIsSellerVerified] = useState(false);
	const [loading, setLoading] = useState(true);
	const { currentStep } = useSelector((state) => state.sellerVerify);

	useEffect(() => {
		const getUserVerificationConfirmation = async () => {
			const token = localStorage.getItem('sellerToken');
			try {
				const response = await axios.get(
					`${baseUrl}/seller/confirm-verification`,
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				if (response.status === 200) {
					const { verified } = response.data;
					setIsSellerVerified(verified);
				}
			} catch (error) {
				if (error.response && error.response.data.error === 'jwt expired') {
					toast.error('Session expired! Please log in again!');
					setInterval(() => {
						localStorage.removeItem('sellerToken');
					}, 1000);
				} else {
					console.error('Something went wrong!', error.message);
				}
			} finally {
				setLoading(false);
			}
		};
		getUserVerificationConfirmation();
	}, []);

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

			{loading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '50vh',
					}}>
					<ReactLoading type='bubbles' color={theme.palette.primary.main} />
				</Box>
			) : !isSellerVerified ? (
				<Box sx={{ width: '100%', mb: 10 }}>
					<Divider sx={{ mt: '20px' }} />
					<Typography
						variant='h6'
						color='error'
						sx={{ textAlign: 'center', my: '40px', fontWeight: '600' }}>
						Please complete the following steps to add your first product to the
						store and start selling!
					</Typography>
					<Box sx={{ mt: 4 }}>
						<Stepper activeStep={currentStep} alternativeLabel>
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
							{currentStep === 0 && <StoreSetup />}
							{currentStep === 1 && <AddressVerification />}
							{currentStep === 2 && <NIDVerification />}
							{currentStep === 3 && (
								<BankDetails setState={setIsSellerVerified} />
							)}
						</Paper>
					</Box>
				</Box>
			) : (
				<Outlet />
			)}
		</>
	);
}

export default Products;
