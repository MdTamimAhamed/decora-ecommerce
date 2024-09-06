import { useTheme } from '@emotion/react';
import {
	Box,
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

function AddProducts() {
	const theme = useTheme();
	const [stepCounter, setStepCounter] = useState(0);

	const steps = [
		{ label: 'Basic Information of Product', id: 'basic-info' },
		{ label: 'Price, Stock and Varients', id: 'price-stock-varient' },
		{ label: 'Product Description', id: 'description' },
		{ label: 'Service ', id: 'service' },
		{ label: 'Submit ' },
	];

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

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				gap: 5,
				my: 5,
			}}>
			<Box sx={{ maxWidth: '992px' }}>
				{/* ----------basic information component--------- */}
				<BasicInformation />
				{/* ----------product price-stock-varient--------- */}
				<PriceStockVarient />
				{/* ----------product description--------- */}
				<ProductDescription />
				{/* ----------product description--------- */}
				<Services />
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
