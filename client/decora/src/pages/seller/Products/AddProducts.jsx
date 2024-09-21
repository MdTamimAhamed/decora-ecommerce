import { useTheme } from '@emotion/react';
import {
	Box,
	Button,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import BasicInformation from './Add-Product-Sections/BasicInformation';
import PriceStockVarient from './Add-Product-Sections/PriceStockVarient';
import ProductDescription from './Add-Product-Sections/ProductDescription';
import Services from './Add-Product-Sections/Services';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { useSelector } from 'react-redux';

function AddProducts() {
	const theme = useTheme();
	const [stepCounter, setStepCounter] = useState(0);
	const formData = new FormData();

	const { sellerInfo } = useSelector((state) => state.auth);

	async function handleFormSubmit(e) {
		e.preventDefault();
		formData.append('sellerId', sellerInfo._id);

		try {
			const response = await axios.post(
				`${baseUrl}/seller/product/add`,
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			);
			console.log('Response:', response.data);
		} catch (error) {
			console.log('Axios error:', error);
			if (error.response && error.response.data.errors) {
				console.log('Server error:', error.response.data.errors);
			}
		}
	}

	useEffect(() => {
		const sections = steps.map((item) => document.getElementById(item.id));
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = steps.findIndex(
							(step) => step.id === entry.target.id
						);
						setStepCounter(index);
					}
				});
			},
			{ threshold: 0.6 }
		);

		sections.forEach((section) => section && observer.observe(section));
		return () => observer.disconnect();
	}, []);

	const steps = [
		{ label: 'Basic Information of Product', id: 'basic-info' },
		{ label: 'Price, Stock and Varients', id: 'price-stock-varient' },
		{ label: 'Product Description', id: 'description' },
		{ label: 'Service ', id: 'service' },
		{ label: 'Submit ', id: 'form-submit' },
	];

	return (
		<Box
			id='form-submit'
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				gap: 5,
				my: 5,
			}}>
			<Box sx={{ maxWidth: '992px' }}>
				{/* ----------basic information component--------- */}
				<BasicInformation formData={formData} />
				{/* ----------product price-stock-varient--------- */}
				<PriceStockVarient formData={formData} />
				{/* ----------product description--------- */}
				<ProductDescription formData={formData} />
				{/* ----------product description--------- */}
				<Services formData={formData} />
				<Box
					component='form'
					onSubmit={handleFormSubmit}
					id='form-submit'
					sx={{
						width: '100%',
						padding: 4,
						mt: 8,
						boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
					}}>
					<Paper
						variant='outlined'
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'end',
							alignItems: 'center',
						}}>
						<Button type='submit' sx={{ py: 1, margin: 2 }} variant='contained'>
							Publish Product
						</Button>
					</Paper>
				</Box>
			</Box>

			<Box
				sx={{
					maxWidth: '250px',
					position: 'fixed',
					right: '5%',
				}}>
				<Paper
					sx={{
						padding: 3,
						boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
					}}>
					<Stepper activeStep={stepCounter} orientation='vertical'>
						{steps.map((item) => (
							<Step key={item.label}>
								<StepLabel>
									<Typography></Typography>
									{item.label}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Paper>
			</Box>
		</Box>
	);
}

export default AddProducts;
