import {
	Box,
	Button,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/BaseURL';
import { fontSize, fontWeight } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontWeight: 500,
	fontSize: '16px',
	color: theme.palette.common.white,
}));

function PublishedProducts() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [sellerProducts, setSellerProducts] = useState([]);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { sellerInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		async function getSellerProducts() {
			try {
				const response = await axios.get(
					`${baseUrl}/api/products/${sellerInfo._id}`
				);
				if (response.status === 200) {
					setSellerProducts(response.data.products);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		getSellerProducts();
	}, [sellerInfo._id]);

	function onManageProductBtnClick() {
		navigate(`/manage-products`);
	}

	return (
		<>
			{sellerProducts.length > 0 ? (
				<Paper variant='outlined' sx={{ padding: 2, mt: 1 }}>
					<TableContainer>
						<Table>
							<TableHead sx={{ bgcolor: theme.palette.primary.main }}>
								<TableRow>
									<StyledTableCell>SL.No.</StyledTableCell>
									<StyledTableCell>Thumbnail</StyledTableCell>
									<StyledTableCell>Product Title</StyledTableCell>
									<StyledTableCell>Product ID</StyledTableCell>
									<StyledTableCell>Actions</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{sellerProducts.map((product, index) => (
									<TableRow key={product.productCode}>
										<TableCell>{index}</TableCell>
										<TableCell>
											<img
												loading='lazy'
												src={product.productBasicInformation.productImage.cover}
												height='50px'
												width='50px'
											/>
										</TableCell>
										<TableCell width='30%'>
											{product.productBasicInformation.productInfo.englishTitle}
										</TableCell>
										<TableCell>{product.productCode}</TableCell>
										<TableCell>
											<Button
												onClick={onManageProductBtnClick}
												sx={{
													borderColor: theme.palette.info.main,
													color: theme.palette.info.main,
													':hover': {
														borderColor: theme.palette.info.main,
													},
												}}
												variant='outlined'
												size='small'>
												Manage Product
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			) : (
				<Typography>You did not publish any product!</Typography>
			)}
		</>
	);
}

export default PublishedProducts;
