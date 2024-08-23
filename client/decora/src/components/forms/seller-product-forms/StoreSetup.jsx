import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import InputFileUpload from '../../reuseables/InputFileUpload';
import { alpha } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { handleSteps } from '../../../features/seller/sellerVerificationSlice';

function StoreSetup() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [storeName, setStoreName] = useState('');
	const [storeSubtitle, setStoreSubtitle] = useState('');
	const [profileImage, setProfileImage] = useState({});
	const [msg, setMsg] = useState([]);

	async function handleStoreSetup(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('storeName', storeName);
		formData.append('storeSubtitle', storeSubtitle);
		formData.append('profileImage', profileImage);

		try {
			const response = await axios.post(
				`${baseUrl}/seller/products/store-setup`,
				formData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			if (response.status === 200) {
				const { message } = response.data;
				setMsg(message[0]);
				toast.success(message[1]);
				setTimeout(() => {
					dispatch(handleSteps({ step: 1 }));
				}, 2000);
			}
		} catch (error) {
			console.errorr(error);
		}
	}

	return (
		<Box
			component='form'
			sx={{ maxWidth: '768px', margin: 'auto', padding: '30px' }}>
			<Typography variant='h6' fontWeight={500}>
				Store Information
			</Typography>
			<Box sx={{ display: 'flex', gap: 3 }}>
				<InputHandler
					labelName='Store Name'
					type='text'
					state={storeName}
					setState={setStoreName}
					placeholder='Enter store name'
					autoComplete='nope'
				/>
				<InputHandler
					labelName='Store Subtitle'
					type='text'
					state={storeSubtitle}
					setState={setStoreSubtitle}
					placeholder='Subtitle/tag/slogun'
					autoComplete='nope'
				/>
			</Box>

			<Typography variant='subtitle2'>Upload Store/Profile Image</Typography>
			<Paper
				variant='outlined'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '40px',
					bgcolor: alpha(theme.palette.primary.main, 0.1),
					mt: '2px',
					borderStyle: 'dashed',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<InputFileUpload setState={setProfileImage} />
					{profileImage && <Typography>{profileImage.name}</Typography>}
					<Typography
						variant='subtitle2'
						color={alpha(theme.palette.primary.main, 0.5)}>
						{msg}
					</Typography>
				</Box>
			</Paper>

			<Button onClick={handleStoreSetup} variant='contained' sx={{ mt: 2 }}>
				Next
			</Button>

			<ToastContainer
				position='bottom-right'
				autoClose={1500}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme='dark'
			/>
		</Box>
	);
}

export default StoreSetup;
