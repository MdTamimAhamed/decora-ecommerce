import { Box, Button, Paper, Typography } from '@mui/material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useTheme } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast } from 'react-toastify';
import { seller } from '../../../features/auth/authSlice';

const ProductCardSidebar = ({ sellerData, data }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const { customerOrderData } = useSelector((state) => state.customerOrder);
	const { userInfo } = useSelector((state) => state.auth);
	console.log('sellerData', sellerData?.[0]?.sellerId);
	async function onSubmitHandler() {
		try {
			const response = await axios.post(`${baseUrl}/api/cart/add-to-cart`, {
				prod_id: data?._id,
				customer_id: userInfo._id,
				seller_id: sellerData?.[0]?.sellerId,
				product_price: data?.productPriceStockAndVarient?.productPrice,
				customerOrderData,
			});

			if (response.status === 200) {
				const { message } = response.data;
				toast.success(message);
				navigate('/cart');
			}
		} catch (error) {
			console.log('Error:', error);
		}
	}

	return (
		<Paper
			variant='outlined'
			sx={{ padding: 2, mt: 3, minWidth: '20%', height: '50vh' }}>
			<Typography fontWeight={600}>Delivery Location:</Typography>
			<Box>
				<Paper variant='outlined' sx={{ padding: 2 }}>
					<FmdGoodIcon sx={{ fontSize: 20, color: theme.palette.error.main }} />
					<Typography variant='subtitle2'>
						House #1, Block-D, Zoo-road, Mirpur-Dhaka
					</Typography>
					<Button variant='contained' size='small' sx={{ mt: 2 }}>
						Change
					</Button>
				</Paper>
				<Paper variant='outlined' sx={{ padding: 2, mt: 2 }}>
					<Typography variant='subtitle2'>
						House #1, Block-D, Zoo-road, Mirpur-Dhaka
					</Typography>
				</Paper>

				<Button
					fullWidth
					variant='contained'
					disableElevation
					size='large'
					onClick={onSubmitHandler}
					sx={{
						mt: 2,
						bgcolor: theme.palette.warning.main,
						':hover': { bgcolor: theme.palette.warning.light },
					}}>
					Add To Cart
				</Button>
			</Box>
		</Paper>
	);
};

export default ProductCardSidebar;
