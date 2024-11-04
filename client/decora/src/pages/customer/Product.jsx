import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomerNavbar from '../../layout/customer/CustomerNavbar';
import axios from 'axios';
import { baseUrl } from '../../utils/BaseURL';
import FilterBar from '../../layout/customer/FilterBar';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ui/product/ProductCard';
import ReactLoading from 'react-loading';

function Product() {
  const theme = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isUserAuthenticated } = useSelector((state) => state.auth);

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
    return;
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.custom.custom_bg }}>
      <CustomerNavbar />
      <Box>
        <Container sx={{ display: 'flex', gap: 8, mt: 5 }} maxWidth="xl">
          {isUserAuthenticated ? (
            <FilterBar
              productData={featuredProducts}
              onApplyFilters={setFilters}
            />
          ) : (
            ''
          )}
          <Paper variant="outlined">
            <Typography
              variant="h6"
              sx={{ paddingX: '20px', paddingY: '10px' }}
            >
              All Products
            </Typography>
            <ProductCard productData={featuredProducts} />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Product;
