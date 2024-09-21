import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../../layout/customer/CustomerNavbar';
import axios from 'axios';
import { baseUrl } from '../../utils/BaseURL';
import FilterBar from '../../layout/customer/FilterBar';
import { useTheme } from '@emotion/react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

function Home() {
	const theme = useTheme();
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log('This is product:', featuredProducts);

	useEffect(() => {
		async function getFeaturedProducts() {
			try {
				const response = await axios.get(`${baseUrl}/api/featured`);
				if (response.status === 200) {
					setFeaturedProducts(response.data.products);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		getFeaturedProducts();
	}, []);

	if (loading) {
		return <Box>Loading data....</Box>;
	}

	return (
		<Box sx={{ backgroundColor: theme.palette.custom.custom_bg }}>
			<CustomerNavbar />
			<Box>
				<Container sx={{ display: 'flex', gap: 8, mt: 5 }} maxWidth='xl'>
					<FilterBar />
					<Paper variant='outlined'>
						<Typography
							variant='h6'
							sx={{ paddingX: '20px', paddingY: '10px' }}>
							Featured Products
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								gap: 3,
								padding: '20px',
							}}>
							{featuredProducts.map((product) => (
								<Paper
									variant='outlined'
									sx={{ height: 'auto', width: '100%', padding: '10px' }}
									key={product._id}>
									<img
										height='auto'
										width='100%'
										src={product.productBasicInformation.productImage.cover}
									/>
									<Typography>
										{product.productBasicInformation.productInfo.englishTitle}
									</Typography>
									<Typography mt={2}>
										<FaBangladeshiTakaSign />
										{product.productPriceStockAndVarient.productPrice.price}
									</Typography>
								</Paper>
							))}
						</Box>
					</Paper>
				</Container>
			</Box>
		</Box>
	);
}

export default Home;
