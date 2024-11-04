import { useTheme } from '@emotion/react';
import { baseUrl } from '../../../utils/BaseURL';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductPreviewCard from '../../../components/ui/product/ProductPreviewCard';
import { useSelector } from 'react-redux';
import ProductCardSidebar from '../../../components/ui/product/ProductCardSidebar';
import { Box } from '@mui/material';

const ProductPreview = () => {
	const theme = useTheme();
	const [products, setProducts] = useState([]);
	const [seller, setSeller] = useState();
	const [rating, setRating] = useState(0);
	const { prod_id } = useParams();
	const { sellerInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		async function getProducts() {
			try {
				const response = await axios.get(
					`${baseUrl}/api/products/product/${prod_id}?sellerId=${sellerInfo._id}`
				);
				if (response.status === 200) {
					const { products, seller } = response.data;
					setProducts(products);
					setSeller(seller);
				}
			} catch (error) {
				console.log('Details:', error);
			}
		}
		getProducts();
	}, [prod_id]);

	const data = products[0];
	const sellerData = seller;

	return (
		<>
			{/* product preview card: 
		- it shows the product with all details in seller store as preview that will be present to client. 
		- takes two prop 'data, sellerData': (the fetched product data) only */}
			<Box sx={{ display: 'flex', gap: 2 }}>
				<ProductPreviewCard data={data} sellerData={sellerData} />
				<ProductCardSidebar userData={sellerData} />
			</Box>
		</>
	);
};

export default ProductPreview;
