import { Paper, alpha, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { handleSteps } from '../../../features/seller/sellerVerificationSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { baseUrl } from '../../../utils/BaseURL';
import { useDispatch, useSelector } from 'react-redux';
import InputHandler from '../form-controllers/InputHandler';
import InputFileUpload from '../../reuseables/InputFileUpload';
import axios from 'axios';
import CountrySelector from '../../reuseables/CountrySelector';
import { useNavigate } from 'react-router-dom';

function BankDetails({ setState }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [bankStatement, setBankStatement] = useState(null);
	const [accountName, setAccountName] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [bankName, setBankName] = useState('');
	const [branchName, setBranchName] = useState('');

	const { sellerDocumentId } = useSelector((state) => state.sellerVerify);

	async function handleBankDetails(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('bankStatement', bankStatement);
		formData.append('accountName', accountName);
		formData.append('accountNumber', accountNumber);
		formData.append('bankName', bankName);
		formData.append('branchName', branchName);
		formData.append('sellerDocumentId', sellerDocumentId);

		try {
			const response = await axios.post(
				`${baseUrl}/seller/products/bank-details`,
				formData,
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);

			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				setTimeout(() => {
					navigate('/products');
					window.location.reload();
				}, 1500);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Box
			component='form'
			sx={{ maxWidth: '768px', margin: 'auto', padding: '30px' }}>
			<Typography variant='h6' mb={1} fontWeight={500}>
				Bank Details
			</Typography>

			{/* bank statement upload */}
			<Box sx={{ flex: 1, minWidth: 0 }}>
				<Typography variant='subtitle' sx={{ color: 'rgba(0,0,0,0.4)' }}>
					Upload Bank Statement (ex: electricity bills,tax paper)
				</Typography>
				<Paper
					variant='outlined'
					sx={{
						display: 'flex',
						flexBasis: '50%',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '40px',
						bgcolor: alpha(theme.palette.primary.main, 0.1),
						mt: '2px',
						borderStyle: 'dashed',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<InputFileUpload setState={setBankStatement} />
						{bankStatement && (
							<Typography variant='subtitle2'>{bankStatement.name}</Typography>
						)}
					</Box>
				</Paper>
			</Box>

			<Box mt={1}>
				<InputHandler
					labelName='Bank account name'
					state={accountName}
					setState={setAccountName}
					placeholder='Enter Account Name'
				/>
				<InputHandler
					labelName='Bank account number'
					state={accountNumber}
					setState={setAccountNumber}
					placeholder='Enter Account Number'
				/>
				<CountrySelector
					size='small'
					selectOption='bank'
					setState={setBankName}
					label='Select Bank Name'
				/>
				<InputHandler
					labelName='Branch name'
					state={branchName}
					setState={setBranchName}
					placeholder='Enter Branch Name'
				/>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
				<Button
					variant='outlined'
					onClick={() => dispatch(handleSteps({ step: 2 }))}>
					Back
				</Button>
				<Button variant='contained' onClick={handleBankDetails}>
					Submit
				</Button>
			</Box>

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

export default BankDetails;
