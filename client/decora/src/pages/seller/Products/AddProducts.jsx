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
		<Box sx={{ display: 'flex', gap: 5, mt: 5 }}>
			{/* ----------basic information component--------- */}
			<BasicInformation />
			{/* ---------------------------------------------- */}

			<Box>
				<Paper
					sx={{
						width: '250px',
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
