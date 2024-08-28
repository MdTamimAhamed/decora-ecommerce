import { useTheme } from '@emotion/react';
import {
	Box,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import BasicInformation from './Add-Product-Sections/BasicInformation';
import PriceStockVarient from './Add-Product-Sections/PriceStockVarient';

function AddProducts() {
	const theme = useTheme();
	const [stepCounter, setStepCounter] = useState(0);

	const steps = [
		{ label: 'Basic Information of Product' },
		{ label: 'Price, Stock and Varients' },
		{ label: 'Product Description' },
		{ label: 'Service ' },
	];

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				gap: 5,
				my: 5,
			}}>
			<Box sx={{ flexBasis: '70%' }}>
				{/* ----------basic information component--------- */}
				<BasicInformation />
				{/* ----------product price-stock-varient--------- */}
				<PriceStockVarient />
			</Box>

			<Box sx={{ width: '250px' }}>
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
