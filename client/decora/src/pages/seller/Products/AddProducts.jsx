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
import { Outlet } from 'react-router-dom';
import InputFileUploadSmall from '../../../components/reuseables/InputFileUploadSmall';

function AddProducts() {
	const theme = useTheme();
	const [stepCounter, setStepCounter] = useState(0);

	const [cover, setCover] = useState(null);
	const [files, setFiles] = useState([]);

	const steps = [
		{ label: 'Basic Information of Product' },
		{ label: 'Price, Stock and Varients' },
		{ label: 'Product Description' },
		{ label: 'Service ' },
	];

	return (
		<Box sx={{ display: 'flex', gap: 5, mt: 5 }}>
			<Paper
				sx={{
					width: '100%',
					padding: 4,
					boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
				}}>
				<Typography variant='h6' fontWeight={600}>
					Basic Information of Product
				</Typography>
				<Paper variant='outlined' sx={{ padding: 3, mt: 3 }}>
					<Typography fontWeight={600}>Product Image/Video</Typography>
					<Typography color='#bbb'>Upload atleast 3 product image</Typography>
					<Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
						<Box>
							<InputFileUploadSmall setState={setCover} />
						</Box>
						<Box>
							<InputFileUploadSmall uploadType='multiple' setState={setFiles} />
						</Box>
						<Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
							{cover ? (
								<Paper variant='outlined' sx={{ height: 100, width: 100 }}>
									<>
										<img
											src={URL.createObjectURL(cover)}
											height='100%'
											width='100%'
										/>
										<Typography
											sx={{
												textAlign: 'center',
												color: `${theme.palette.custom.dark_red}`,
												fontSize: '0.8em',
											}}>
											Cover image*
										</Typography>
									</>
								</Paper>
							) : null}

							{files.length > 0 ? (
								<>
									{files.map((item, index) => (
										<Paper
											key={index}
											variant='outlined'
											sx={{ height: 100, width: 100 }}>
											<>
												<img
													src={URL.createObjectURL(item)}
													height='100%'
													width='100%'
												/>
												<Typography
													sx={{
														textAlign: 'center',
														color: `${theme.palette.custom.dark_red}`,
														fontSize: '0.8em',
													}}>
													images
												</Typography>
											</>
										</Paper>
									))}
								</>
							) : null}
						</Box>
					</Box>
				</Paper>
			</Paper>
			<Box>
				<Paper
					sx={{
						width: '200px',
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
