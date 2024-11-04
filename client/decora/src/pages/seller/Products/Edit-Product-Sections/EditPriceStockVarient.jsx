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
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useTheme } from '@emotion/react';
import DateHandler from '../../../../components/forms/form-controllers/DateHandler';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../../../components/forms/form-controllers/ErrorMessage';
import { alpha } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

function EditPriceStockVarient({ formData, fatchedData }) {
	//--------------------------hooks-------------------------------//
	const theme = useTheme();

	const [productPrice, setProductPrice] = useState(0);
	const [discountPrice, setDiscountPrice] = useState(0);

	const [check, setCheck] = useState(false);
	const [varient, setVarient] = useState([{ colorFamily: '', image: null }]);

	const [productQuantity, setProductQuantity] = useState(0);
	const [productMeasurement, setProductMeasurement] = useState([
		{
			height: '',
			width: '',
			length: '',
		},
	]);

	const [availableFrom, setAvailableFrom] = useState(dayjs());
	const [availableTo, setAvailableTo] = useState(dayjs());
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

	console.log('h:', productMeasurement[0].height);

	const [customDeliveryTimeCheck, setCustomDeliveryTimeCheck] = useState(false);
	const [customDeliveryTime, setCustomDeliveryTime] = useState(0);

	const { validationErrors } = useSelector((state) => state.products);

	useEffect(() => {
		if (productPrice) formData.append('productPrice', productPrice);
		formData.append('discountPrice', discountPrice);
		if (varient) {
			varient.forEach((item) => {
				formData.append('varientImages', item.image);
				formData.append('colorFamily', item.colorFamily);
			});
		}
		formData.append('productQuantity', productQuantity);
		formData.append('productMeasurement', JSON.stringify(productMeasurement));
		formData.append('availableFrom', availableFrom.format('MM-DD-YYYY'));
		formData.append('availableTo', availableTo.format('MM-DD-YYYY'));
		if (deliveryTime) formData.append('deliveryTime', deliveryTime);
		formData.append('customOrderCheck', customOrderCheck);
		if (customOrderCheck) {
			formData.append(
				'customOrderMeasurements',
				JSON.stringify(customMeasurements)
			);
		}
		if (customOrderCheck && !customDeliveryTime)
			formData.append('customDeliveryTimeCheck', customDeliveryTimeCheck);
		if (customOrderCheck && customDeliveryTime && !customDeliveryTimeCheck)
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

	const data = fatchedData?.productPriceStockAndVarient;

	useEffect(() => {
		if (data) {
			setProductPrice(data.productPrice);
			setDiscountPrice(data.discountPrice);
			setVarient(data.colorVarient);
			setProductQuantity(data.productQuantity);
			setProductMeasurement(data.productMeasurement);
			setAvailableFrom(dayjs(data.availability.from));
			setAvailableFrom(dayjs(data.availability.to));
			setDeliveryTime(data.deliveryTime);
			setCustomOrderCheck(data.customOrder.check);
			setCustomMeasurements(
				data.customOrder.customOrderMeasurements || {
					minHeight: { value: '', metric: '' },
					minWidth: { value: '', metric: '' },
					minLength: { value: '', metric: '' },
					maxHeight: { value: '', metric: '' },
					maxWidth: { value: '', metric: '' },
					maxLength: { value: '', metric: '' },
				}
			);
		}
	}, [data]);
	console.log('v:', varient);

	//-------------------------logics----------------------------//
	function handleCheckbox(condition) {
		if (condition === 'ADD-IMAGE') setCheck(!check);
		if (condition === 'CUSTOM-ORDER') {
			if (data?.customOrder.check) {
				setCustomOrderCheck(!customOrderCheck);
			} else {
				setCustomOrderCheck(!customOrderCheck);
			}
		}
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
		setProductMeasurement((initialValue) => {
			return [{ ...initialValue[0], [field]: value }];
		});
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
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
				}}>
				<EditNoteIcon sx={{ fontSize: 28 }} />
				<Typography color='primary' variant='h6' fontWeight={600}>
					Edit Product Price,Stock and Varient
				</Typography>
			</Box>

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

							{/* {item.image && (
								<Box key={index} sx={{ height: 100, width: 100, mt: 2 }}>
									<img
										src={URL.createObjectURL(item.image)}
										height='100%'
										width='100%'
									/>
								</Box>
							)} */}

							{item.image || item.colorFamily ? (
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
							) : null}
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
					{validationErrors && (
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
									Note: Please ensure that you provide the size Units
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
							state={productMeasurement[0]?.height}
							setState={(value) => handleOriginalMeasurement('height', value)}
							placeholder='Ex- 2.5 inch'
						/>
						<InputHandler
							labelName='Product Width'
							size='medium'
							state={productMeasurement[0]?.width}
							setState={(value) => handleOriginalMeasurement('width', value)}
							placeholder='Ex- 2.5 inch'
						/>
						<InputHandler
							labelName='Product Lenght'
							size='medium'
							state={productMeasurement[0]?.length}
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
						justifyContent: 'space-between',
						gap: 3,
						mb: 5,
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'start',
							gap: 3,
						}}>
						<Box sx={{ flex: '0 1 100%' }}>
							<Typography variant='subtitle2'>Available From</Typography>
							<DateHandler
								setState={setAvailableFrom}
								value={availableFrom}
								margin={0}
							/>
						</Box>
						<Box sx={{ flex: '0 1 100%' }}>
							<Typography variant='subtitle2'>To</Typography>
							<DateHandler
								setState={setAvailableTo}
								value={availableTo}
								margin={0}
							/>
						</Box>
					</Box>
					<InputHandler
						required
						labelName='Delivery time (days)'
						size='medium'
						state={deliveryTime}
						setState={setDeliveryTime}
						margin={22}
						type='number'
						placeholder='Enter Delivery Time'
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
					control={
						<Checkbox
							checked={customOrderCheck}
							onChange={() => handleCheckbox('CUSTOM-ORDER')}
						/>
					}
				/>

				{customOrderCheck && (
					<Box>
						<Box sx={{ display: 'flex', gap: 3 }}>
							<InputHandlerForMeasurement
								labelName='Minimum Height'
								size='medium'
								state={customMeasurements?.minHeight?.value}
								setState={(value) => handleMeasurementValue('minHeight', value)}
								fetchedMetric={customMeasurements?.minHeight?.metric}
								setMetrics={(metricValue) =>
									handleMetricValue('minHeight', metricValue)
								}
								placeholder='Enter Minimum Height'
							/>

							<InputHandlerForMeasurement
								labelName='Minimum Width'
								size='medium'
								state={customMeasurements?.minWidth?.value || ''}
								setState={(value) => handleMeasurementValue('minWidth', value)}
								fetchedMetric={customMeasurements?.minWidth?.metric}
								setMetrics={(metricValue) =>
									handleMetricValue('minWidth', metricValue)
								}
								placeholder='Enter Minimum Width '
							/>
							<InputHandlerForMeasurement
								labelName='Minimum Length'
								size='medium'
								state={customMeasurements?.minLength?.value}
								setState={(value) => handleMeasurementValue('minLength', value)}
								fetchedMetric={customMeasurements?.minLength?.metric}
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
								state={customMeasurements?.maxHeight?.value}
								setState={(value) => handleMeasurementValue('maxHeight', value)}
								fetchedMetric={customMeasurements?.maxHeight?.metric}
								setMetrics={(metricValue) =>
									handleMetricValue('maxHeight', metricValue)
								}
								placeholder='Enter Maximum Height'
							/>
							<InputHandlerForMeasurement
								labelName='Maximum Width'
								size='medium'
								state={customMeasurements?.maxWidth?.value}
								setState={(value) => handleMeasurementValue('maxWidth', value)}
								fetchedMetric={customMeasurements?.maxWidth?.metric}
								setMetrics={(metricValue) =>
									handleMetricValue('maxWidth', metricValue)
								}
								placeholder='Enter Maximum Width '
							/>
							<InputHandlerForMeasurement
								labelName='Maximum Length'
								size='medium'
								state={customMeasurements?.maxLength?.value}
								setState={(value) => handleMeasurementValue('maxLength', value)}
								fetchedMetric={customMeasurements?.maxLength?.metric}
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

export default EditPriceStockVarient;
