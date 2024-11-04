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
import { toast } from 'react-toastify';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontWeight: 400,
	fontSize: '14px',
	color: theme.palette.common.white,
}));

function ManageProducts() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [sellerProducts, setSellerProducts] = useState([]);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { sellerInfo } = useSelector((state) => state.auth);

	async function deleteProduct(productCode) {
		try {
			const response = await axios.delete(
				`${baseUrl}/api/products/${productCode}`
			);
			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			if (error.response && error.response.data.errors) {
				console.log(' Error deleting product:', error);
			} else {
				toast.error('Product delete failed!');
			}
		}
	}

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

	function handleEdit(product_code) {
		navigate(`/manage-products/edit/${product_code}`);
	}

	function handleOnClickPreview(product_code) {
		navigate(`/store/${product_code}`);
	}

	return (
		<>
			<Box mt={4}>
				<Typography variant='h6'>Manage Products</Typography>
			</Box>
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
									<StyledTableCell>Category</StyledTableCell>
									<StyledTableCell>Price</StyledTableCell>
									<StyledTableCell>In Stock</StyledTableCell>
									<StyledTableCell>Delivery</StyledTableCell>
									<StyledTableCell>Custom Order</StyledTableCell>
									<StyledTableCell>Custom Delivery</StyledTableCell>
									<StyledTableCell align='center'>Actions</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{sellerProducts.map((product, index) => (
									<TableRow key={product.productCode}>
										<TableCell>{index}</TableCell>
										<TableCell>
											<img
												src={product.productBasicInformation.productImage.cover}
												height='50px'
												width='50px'
											/>
										</TableCell>
										<TableCell width='15%'>
											{product.productBasicInformation.productInfo.englishTitle}
										</TableCell>

										<TableCell>{product.productCode}</TableCell>

										<TableCell>
											{`${product.productBasicInformation.productInfo.category}`}
										</TableCell>

										<TableCell>
											{`${product.productPriceStockAndVarient.productPrice} Tk.`}
										</TableCell>

										<TableCell width='7%'>
											{`${product.productPriceStockAndVarient.productQuantity} items`}
										</TableCell>

										<TableCell width='5%'>
											{`${product.productPriceStockAndVarient.deliveryTime}`}
											{`${
												product.productPriceStockAndVarient.deliveryTime > 1
													? ' days'
													: ' day'
											}`}
										</TableCell>

										<TableCell width='5%'>
											{product.productPriceStockAndVarient.customOrder.check ? (
												<CheckBoxIcon
													sx={{ color: theme.palette.success.light }}
												/>
											) : (
												<CloseIcon sx={{ color: theme.palette.error.light }} />
											)}
										</TableCell>

										{/*--------------- custom delivery time -------------*/}
										<TableCell width='5%'>
											{`${product.productPriceStockAndVarient.customOrder.customOrderDeliveryTime}`}
											{`${
												product.productPriceStockAndVarient
													.customOrderDeliveryTime > 1
													? ' days'
													: ' day'
											}`}
										</TableCell>
										<TableCell width='21%'>
											<Box
												sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
												<Button
													onClick={() =>
														handleOnClickPreview(product.productCode)
													}
													size='small'
													sx={{
														textTransform: 'capitalize',

														color: theme.palette.common.white,
													}}
													variant='contained'>
													Store Preview
												</Button>

												<Button
													onClick={() => handleEdit(product.productCode)}
													size='small'
													variant='outlined'
													sx={{ textTransform: 'capitalize' }}
													color={theme.palette.primary.secondary}>
													Edit
												</Button>

												<Button
													onClick={() => deleteProduct(product.productCode)}
													size='small'
													sx={{
														textTransform: 'capitalize',
														borderColor: theme.palette.error.main,
														color: theme.palette.error.main,
														':hover': { borderColor: theme.palette.error.main },
													}}
													variant='outlined'>
													Delete
												</Button>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			) : (
				<Typography>You have no product!</Typography>
			)}
		</>
	);
}

export default ManageProducts;
