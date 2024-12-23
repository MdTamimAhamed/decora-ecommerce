import { useTheme } from '@emotion/react';
import { baseUrl } from '../../../utils/BaseURL';
import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCardSidebar from '../../../components/ui/product/ProductCardSidebar';
import { Box, Container } from '@mui/material';
import CustomerNavbar from '../../../layout/customer/CustomerNavbar';
import Loader from '../../reuseables/Loader.jsx';
const ProductPreviewCard = React.lazy(
  () => import('../../../components/ui/product/ProductPreviewCard')
);

const ProductDetails = () => {
  const theme = useTheme();
  const [products, setProducts] = useState({});
  const [sellerData, setSellerData] = useState({});

  const { prod_id } = useParams();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          `${baseUrl}/api/products/product/${prod_id}`
        );
        if (response.status === 200) {
          const { products, seller } = response.data;
          setProducts(products);
          setSellerData(seller);
        }
      } catch (error) {}
    }
    getProducts();
  }, [prod_id]);

  const data = products?.[0];

  return (
    <>
      <CustomerNavbar />
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Suspense
            fallback={
              <>
                <Loader size={'xs'} type="spin" color={'gray'} />
                Loading...
              </>
            }
          >
            <ProductPreviewCard data={data} sellerData={sellerData} />
          </Suspense>
          <Suspense
            fallback={
              <>
                <Loader size={'xs'} type="spin" color={'gray'} />
                Loading...
              </>
            }
          >
            <ProductCardSidebar data={data} sellerData={sellerData} />
          </Suspense>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetails;
