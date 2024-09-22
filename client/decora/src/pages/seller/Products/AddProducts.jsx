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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addValidationError } from '../../../features/seller/productSlice';
import ErrorMessage from '../../../components/forms/form-controllers/ErrorMessage';

function AddProducts() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [stepCounter, setStepCounter] = useState(0);
	const formData = new FormData();
	const [errorMsg, setError] = useState({});

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
			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				navigate('/products');
			}
		} catch (error) {
			console.log('Axios error:', error);
			if (error.response && error.response.data.errors) {
				dispatch(addValidationError({ message: error.response.data.errors }));
				setError(error.response.data.errors);
			} else {
				dispatch(addValidationError({ message: null }));
				toast.error('Product publish failed!');
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
				my: 15,
			}}>
			<Box
				sx={{
					my: 2,
					position: 'fixed',
					width: '100%',
					top: '5%',
					zIndex: 10,
					maxWidth: '1008px',
				}}>
				<Paper
					sx={{
						width: '100%',
						padding: 3,
						boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
					}}>
					<Stepper activeStep={stepCounter} orientation='horizontal'>
						{steps.map((item) => (
							<Step key={item.label}>
								<StepLabel>
									<Typography variant='body2'>{item.label}</Typography>
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Paper>
			</Box>

			<Box sx={{ maxWidth: '992px', mt: 10 }}>
				{/* ----------basic information component--------- */}
				<BasicInformation formData={formData} />
				{/* <ErrorMessage check={errorMsg.englishTitle} /> */}
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
		</Box>
	);
}

export default AddProducts;
