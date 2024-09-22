import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	InputLabel,
	Paper,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputHandler from '../../../../components/forms/form-controllers/InputHandler';
import ItemSelector from '../../../../components/forms/form-controllers/ItemSelector';
import InputFileUpload from '../../../../components/reuseables/InputFileUpload';
import InputFileUploadSmall from '../../../../components/reuseables/InputFileUploadSmall';
import InputHandlerForMeasurement from '../../../../components/reuseables/InputHandlerForMeasurement';
import { useTheme } from '@emotion/react';
import DateHandler from '../../../../components/forms/form-controllers/DateHandler';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../../../components/forms/form-controllers/ErrorMessage';
import { alpha } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';

function PriceStockVarient({ formData }) {
	//--------------------------hooks-------------------------------//
	const theme = useTheme();

	const [productPrice, setProductPrice] = useState(0);
	const [discountPrice, setDiscountPrice] = useState(0);

	const [check, setCheck] = useState(false);
	const [varient, setVarient] = useState([{ colorFamily: '', image: null }]);

	const [productQuantity, setProductQuantity] = useState(0);
	const [productMeasurement, setProductMeasurement] = useState([
		{ height: '', width: '', length: '' },
	]);

	const [availableFrom, setAvailableFrom] = useState('');
	const [availableTo, setAvailableTo] = useState('');
	const [deliveryTime, setDeliveryTime] = useState(0);

	const [customOrderCheck, setCustomOrderCheck] = useState(false);
	const [customMeasurements, setCustomMeasurements] = useState([
		{
			minHeight: { value: '', metric: '' },
			minWidth: { value: '', metric: '' },
			minLength: { value: '', metric: '' },
			maxHeight: { value: '', metric: '' },
			maxWidth: { value: '', metric: '' },
			maxLength: { value: '', metric: '' },
		},
	]);

	const [customDeliveryTimeCheck, setCustomDeliveryTimeCheck] = useState(false);
	const [customDeliveryTime, setCustomDeliveryTime] = useState(0);

	const { validationErrors } = useSelector((state) => state.products);

	useEffect(() => {
		formData.append('price', productPrice);
		formData.append('discountPrice', discountPrice);
		if (varient) {
			varient.forEach((item) => {
				formData.append('varientImages', item.image);
				formData.append('colorFamily', item.colorFamily);
			});
		}
		formData.append('productQuantity', productQuantity);
		formData.append('productMeasurement', JSON.stringify(productMeasurement));
		formData.append('availableFrom', availableFrom);
		formData.append('availableTo', availableTo);
		formData.append('deliveryTime', deliveryTime);
		formData.append('customOrderCheck', customOrderCheck);
		if (customOrderCheck) {
			formData.append(
				'customOrderMeasurements',
				JSON.stringify(customMeasurements)
			);
		}
		formData.append('customDeliveryTimeCheck', customDeliveryTimeCheck);
		formData.append('customDeliveryTime', customDeliveryTime);
	}, [
		productPrice,
		discountPrice,
		varient,
		productQuantity,
		productMeasurement,
		availableFrom,
		availableTo,
		deliveryTime,
		customOrderCheck,
		customMeasurements,
		customDeliveryTime,
		customDeliveryTime,
		formData,
	]);

	//-------------------------logics----------------------------//
	function handleCheckbox(condition) {
		if (condition === 'ADD-IMAGE') setCheck(!check);
		if (condition === 'CUSTOM-ORDER') setCustomOrderCheck(!customOrderCheck);
		if (condition === 'CUSTOM-DELIVERY-TIME')
			setCustomDeliveryTimeCheck(!customDeliveryTimeCheck);
	}

	function handleVarientBox() {
		if (varient.length < 5) {
			setVarient([...varient, { colorFamily: '', image: null }]);
		}
	}

	function handleColorFamily(index, color) {
		const newColor = [...varient];
		newColor[index].colorFamily = color;
		setVarient(newColor);
	}

	function handleUploadedFiles(index, uploadedFile) {
		const newFiles = [...varient];
		newFiles[index].image = uploadedFile;
		setVarient(newFiles);
	}

	function handleDeleteVarient(index) {
		setVarient((item) => item.filter((_, i) => i !== index));
	}

	function handleOriginalMeasurement(field, value) {
		setProductMeasurement((initialValue) => ({
			...initialValue,
			[field]: value,
		}));
	}

	function handleMeasurementValue(field, value) {
		setCustomMeasurements((initialValue) => ({
			...initialValue,
			[field]: { ...initialValue[field], value: value },
		}));
	}

	function handleMetricValue(field, metricValue) {
		setCustomMeasurements((initialValue) => ({
			...initialValue,
			[field]: { ...initialValue[field], metric: metricValue },
		}));
	}

	return (
		<Paper
			id='price-stock-varient'
			sx={{
				width: '100%',
				padding: 4,
				mt: 8,
				boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
			}}>
			<Typography color='primary' variant='h6' fontWeight={600}>
				Product Price,Stock and Varient
			</Typography>

			<Paper variant='outlined' sx={{ padding: 3, mt: 3, overflowX: 'auto' }}>
				{/* -----------------set product price-------------------- */}
				<Box>
					<Typography mb={1} fontWeight={600}>
						Set Product Price
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', gap: 3, mb: 5 }}>
					<Box sx={{ flex: '0 1 100%' }}>
						<InputHandler
							required
							labelName='Price'
							type='number'
							state={productPrice}
							setState={setProductPrice}
							placeholder='$ Enter price'
							size='medium'
						/>
						<ErrorMessage
							isEmpty={productPrice}
							check={validationErrors.productPrice}
						/>
					</Box>
					<Box sx={{ flex: '0 1 100%' }}>
						<InputHandler
							labelName='Discount Price (optional)'
							type='number'
							state={discountPrice}
							setState={setDiscountPrice}
							placeholder='$ Enter discount price (optional)'
							size='medium'
						/>
					</Box>
				</Box>
				{/* ----------------------------------------------------- */}

				<Divider />

				{/* -----------------set color varients-------------------- */}
				<Typography mt={2} fontWeight={600}>
					Set Color Varients (if have)
				</Typography>
				<FormControlLabel
					label='Add Image'
					name='add-image-check'
					control={<Checkbox onChange={() => handleCheckbox('ADD-IMAGE')} />}
				/>
				<Box
					sx={{
						display: 'flex',
						gap: 3,
						mb: 5,
					}}>
					{varient.map((item, index) => (
						<Paper
							key={index}
							variant='outlined'
							sx={{
								height: 'auto',
								maxWidth: '200px',
								padding: 1,
							}}>
							<InputHandler
								placeholder='Enter color'
								state={item.colorFamily}
								setState={(color) => handleColorFamily(index, color)}
							/>
							{check && (
								<InputFileUpload
									btnText='Add Image'
									setState={(uploadedFile) =>
										handleUploadedFiles(index, uploadedFile)
									}
								/>
							)}

							<ErrorMessage
								isEmpty={varient[0].colorFamily}
								check={validationErrors.colorFamily}
							/>

							{item.image && (
								<Box key={index} sx={{ height: 100, width: 100, mt: 2 }}>
									<img
										src={URL.createObjectURL(item.image)}
										height='100%'
										width='100%'
									/>
								</Box>
							)}

							{item.image && (
								<Button
									size='small'
									onClick={() => handleDeleteVarient(index)}
									variant='outlined'
									color='error'
									className='hover-group'
									sx={{
										mt: 2,
									}}>
									Delete
								</Button>
							)}
						</Paper>
					))}

					{varient.length < 5 ? (
						<Button
							onClick={handleVarientBox}
							variant='outlined'
							sx={{
								height: '100%',
								borderStyle: 'dashed',
								':hover': { borderStyle: 'dashed' },
							}}>
							Add more +
						</Button>
					) : (
						<Typography color={theme.palette.custom.dark_red}>
							Maximum 5 varient allowed!
						</Typography>
					)}
				</Box>
				{/* ----------------------------------------------------- */}

				<Divider />

				{/* -----------------quantity & measurement-------------------- */}
				<Typography mt={2} fontWeight={600}>
					Set Quantity & Measurement
				</Typography>
				<Box mb={5}>
					{validationErrors.height && (
						<Box bgcolor={alpha(theme.palette.warning.light, 1)}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'start',
									gap: 1,
									height: 'auto',
									padding: 1,
									my: 1,
								}}>
								<InfoIcon />
								<Typography variant='subtitle2'>
									Note: Please ensure that you provide the size parameters{' '}
									<b>(mm, cm, m, ft, inch)</b> for the product's height, width,
									and length.
								</Typography>
							</Box>
						</Box>
					)}
					<Box sx={{ display: 'flex', gap: 3 }}>
						<InputHandler
							labelName='Product Quantity'
							type='number'
							size='medium'
							state={productQuantity}
							setState={setProductQuantity}
							placeholder='Enter quantity'
						/>
						<InputHandler
							labelName='Product Height'
							size='medium'
							setState={(value) => handleOriginalMeasurement('height', value)}
							placeholder='Ex- 2.5 inch'
						/>
						<InputHandler
							labelName='Product Width'
							size='medium'
							setState={(value) => handleOriginalMeasurement('width', value)}
							placeholder='Ex- 2.5 inch'
						/>
						<InputHandler
							labelName='Product Lenght'
							size='medium'
							setState={(value) => handleOriginalMeasurement('length', value)}
							placeholder='Ex- 2.5 inch'
						/>
					</Box>
				</Box>

				{/* ----------------------------------------------------- */}

				<Divider />

				{/* -----------------Set Availability & Delivery time----------- */}
				<Typography my={2} fontWeight={600}>
					Set Availability & Delivery time
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: 3,
						mb: 5,
					}}>
					<Box sx={{ flex: '0 1 100%' }}>
						<Box>
							<Typography variant='subtitle2'>Available From</Typography>
							<DateHandler setState={setAvailableFrom} margin={0} />
						</Box>
						<Box mt={2}>
							<Typography variant='subtitle2'>To</Typography>
							<DateHandler setState={setAvailableTo} margin={0} />
						</Box>
					</Box>
					<InputHandler
						required
						labelName='Delivery Days'
						size='medium'
						state={deliveryTime}
						setState={setDeliveryTime}
						margin={22}
						type='number'
						placeholder='Enter Delivery Time (Days)'
					/>
				</Box>
				{/* ----------------------------------------------------- */}

				<Divider />

				{/* -----------Custom Order Measurements & Delivery time------- */}
				<Typography mt={2} fontWeight={600}>
					Custom Order Measurements & Delivery time
				</Typography>
				<FormControlLabel
					label='Allow Custom Order'
					name='custom-order-check'
					control={<Checkbox onChange={() => handleCheckbox('CUSTOM-ORDER')} />}
				/>

				{customOrderCheck && (
					<Box>
						<Box sx={{ display: 'flex', gap: 3 }}>
							<InputHandlerForMeasurement
								labelName='Minimum Height'
								size='medium'
								setState={(value) => handleMeasurementValue('minHeight', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('minHeight', metricValue)
								}
								placeholder='Enter Minimum Height'
							/>

							<InputHandlerForMeasurement
								labelName='Minimum Width'
								size='medium'
								setState={(value) => handleMeasurementValue('minWidth', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('minWidth', metricValue)
								}
								placeholder='Enter Minimum Width '
							/>
							<InputHandlerForMeasurement
								labelName='Minimum Length'
								size='medium'
								setState={(value) => handleMeasurementValue('minLength', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('minLength', metricValue)
								}
								placeholder='Enter Minimum Length '
							/>
						</Box>

						{/* -------for maximum measurements---------- */}
						<Box sx={{ display: 'flex', gap: 3, overflow: 'auto' }}>
							<InputHandlerForMeasurement
								labelName='Maximum Height'
								size='medium'
								setState={(value) => handleMeasurementValue('maxHeight', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('maxHeight', metricValue)
								}
								placeholder='Enter Maximum Height'
							/>
							<InputHandlerForMeasurement
								labelName='Maximum Width'
								size='medium'
								setState={(value) => handleMeasurementValue('maxWidth', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('maxWidth', metricValue)
								}
								placeholder='Enter Maximum Width '
							/>
							<InputHandlerForMeasurement
								labelName='Maximum Length'
								size='medium'
								setState={(value) => handleMeasurementValue('maxLength', value)}
								setMetrics={(metricValue) =>
									handleMetricValue('maxLength', metricValue)
								}
								placeholder='Enter Maximum Length '
							/>
						</Box>
						<Box
							sx={{
								mt: 3,
								display: 'flex',
								justifyContent: 'space-between',
								gap: 3,
							}}>
							<FormControlLabel
								sx={{
									display: 'flex',
									alignItems: 'start',
								}}
								label='[For custom orders, set the delivery time to double the standard delivery time]'
								name='custom-order-delivery-time'
								control={
									<Checkbox
										sx={{ paddingY: '4px' }}
										onChange={() => handleCheckbox('CUSTOM-DELIVERY-TIME')}
									/>
								}
							/>
							<Divider orientation='vertical' flexItem>
								Or
							</Divider>
							<InputHandler
								labelName='Set Custom Delivery Days'
								size='medium'
								type='number'
								state={customDeliveryTime}
								setState={setCustomDeliveryTime}
								placeholder='Enter Custom Delivery Days'
								disabled={customDeliveryTimeCheck && true}
							/>
						</Box>
					</Box>
				)}
				{/* ----------------------------------------------------- */}
			</Paper>
		</Paper>
	);
}

export default PriceStockVarient;
