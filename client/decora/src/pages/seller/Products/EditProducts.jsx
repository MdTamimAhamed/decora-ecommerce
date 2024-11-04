import { useTheme } from '@emotion/react';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	Paper,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addValidationError } from '../../../features/seller/productSlice';
import ReactLoading from 'react-loading';
import { addProdId } from '../../../features/seller/productSlice';
import EditBasicInformation from './Edit-Product-Sections/EditBasicInformation';
import EditPriceStockVarient from './Edit-Product-Sections/EditPriceStockVarient';
import EditProductDescription from './Edit-Product-Sections/EditProductDescription';
import EditServices from './Edit-Product-Sections/EditServices';
import { alpha } from '@mui/system';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditProducts() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { prod_id } = useParams();

	const [stepCounter, setStepCounter] = useState(0);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [error, setError] = useState('');

	const formData = new FormData();
	const prod = products[0];

	async function handleFormSubmit(e) {
		e.preventDefault();

		try {
			const response = await axios.patch(
				`${baseUrl}/api/products/edit/${prod_id}`,
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
			if (error.response && error.response.data.errors) {
				console.log(' Error updating product:', error);
			} else {
				toast.error('Product publish failed!');
			}
		} finally {
			setLoading(false);
		}
	}

	//fetch product details based on prod_id
	useEffect(() => {
		async function getProducts() {
			try {
				const response = await axios.get(
					`${baseUrl}/api/products/edit/${prod_id}`
				);
				if (response.status === 200) {
					setProducts(response.data.products);
					dispatch(addProdId({ id: prod_id }));
				}
			} catch (error) {
				setError(error);
				console.log('Details:', error);
			}
		}
		getProducts();
	}, [prod_id]);

	//check section intersection
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
				<Box
					sx={{
						mb: 2,
					}}>
					<Button
						onClick={() => navigate('/manage-products')}
						variant='outlined'
						sx={{ gap: 1, textTransform: 'capitalize' }}>
						<ArrowBackIcon sx={{ fontSize: '20px' }} /> Back
					</Button>
					<Typography
						variant='h5'
						sx={{ mt: 2, fontWeight: 700, color: theme.palette.primary.main }}>
						Edit Your Product Information
					</Typography>
				</Box>

				{/* ----------basic information component--------- */}
				<EditBasicInformation formData={formData} fatchedData={prod} />
				{/* ----------product price-stock-varient--------- */}
				<EditPriceStockVarient formData={formData} fatchedData={prod} />
				{/* ----------product description--------- */}
				<EditProductDescription formData={formData} fetchedData={prod} />
				{/* ----------product description--------- */}
				<EditServices formData={formData} fetchedData={prod} />

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
						<Button
							onClick={() => setLoading(true)}
							type='submit'
							sx={{ py: 1, margin: 2, gap: 2 }}
							variant='contained'>
							<Typography sx={{ textTransform: 'capitalize' }}>
								{loading ? 'Updating Product...' : 'Update Product'}
							</Typography>
							{loading && (
								<ReactLoading type='spin' height='20px' width='20px' />
							)}
						</Button>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
}

export default EditProducts;
