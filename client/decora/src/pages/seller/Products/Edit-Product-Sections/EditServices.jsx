import {
	Box,
	Checkbox,
	FormControlLabel,
	Paper,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputHandler from '../../../../components/forms/form-controllers/InputHandler';
import ItemSelector from '../../../../components/forms/form-controllers/ItemSelector';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../../../components/forms/form-controllers/ErrorMessage';
import EditNoteIcon from '@mui/icons-material/EditNote';

function EditServices({ formData, fetchedData }) {
	const [returnTime, setReturnTime] = useState(0);
	const [cod, setCod] = useState(true);
	const [serviceType, setServiceType] = useState('');
	const [serviceTime, setServiceTime] = useState(0);

	const { validationErrors } = useSelector((state) => state.products);

	useEffect(() => {
		if (returnTime) formData.append('productReturnTime', returnTime);
		if (cod) formData.append('cashOnDelivery', cod);
		if (serviceType) formData.append('serviceType', serviceType);
		if (serviceTime) formData.append('serviceTime', serviceTime);
	}, [returnTime, cod, serviceType, serviceTime, formData]);

	const data = fetchedData?.services;
	console.log('data', data);

	useEffect(() => {
		if (data) {
			setReturnTime(data.productReturnTime);
			setCod(data.cashOnDelivery);
			setServiceType(data.serviceType);
			setServiceTime(data.serviceTime);
		}
	}, [data]);

	const option = ['Warranty', 'Guarantee', 'None'];
	function handleCheckbox() {
		if ('ALLOW-COD') setCod(!cod);
	}
	return (
		<Paper
			id='service'
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
					Edit Services
				</Typography>
			</Box>

			<Paper variant='outlined' sx={{ padding: 3, mt: 3, overflowX: 'auto' }}>
				<Typography fontWeight={600}>Set product return time & COD </Typography>
				<Box
					mt={1}
					sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
					<InputHandler
						type='number'
						size='medium'
						state={returnTime}
						setState={setReturnTime}
						labelName='Return in (days)'
						placeholder='Enter Product Return Time (days)'
					/>
					<FormControlLabel
						sx={{ minWidth: '48%' }}
						checked={cod ? true : false}
						label='Allow Cash on Delivery (COD). [if not, uncheck it]'
						name='custom-order-check'
						control={
							<Checkbox
								sx={{ display: 'flex', justifyContent: 'start', padding: 0 }}
								onChange={() => handleCheckbox('ALLOW-COD')}
							/>
						}
					/>
				</Box>

				<Typography mt={2} fontWeight={600}>
					Set Warranty
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 3,
					}}>
					<ItemSelector
						size='medium'
						label='Select service type'
						state={serviceType}
						setState={setServiceType}
						options={option}
					/>
					<InputHandler
						type='number'
						size='medium'
						state={serviceTime}
						setState={setServiceTime}
						labelName='Service time (years)'
						placeholder='Service time (years)'
					/>
				</Box>
			</Paper>
		</Paper>
	);
}

export default EditServices;
