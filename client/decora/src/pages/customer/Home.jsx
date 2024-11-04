import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { baseUrl } from '../../utils/BaseURL';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Slider from '../../components/reuseables/Slider.jsx';

import FilterBar from '../../layout/customer/FilterBar';
import CustomerNavbar from '../../layout/customer/CustomerNavbar';
import ProductCard from '../../components/ui/product/ProductCard';
import { sliderData } from '../../data/sliderData.js';

function Home() {
  const theme = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('filters:', filters);

  const { isUserAuthenticated } = useSelector((state) => state.auth);
  const { cartLength } = useSelector((state) => state.products);

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

  if (loading) return null;
  if (error)
    return <Typography color="error">Failed to load products</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.custom.custom_bg,
        minHeight: '80vh',
      }}
    >
      <CustomerNavbar cartLength={cartLength} />
      <Box>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
            mt: 5,
          }}
          maxWidth="xl"
        >
          {isUserAuthenticated && <FilterBar onApplyFilters={setFilters} />}

          <Paper
            variant="outlined"
            sx={{ flex: '0 1 100%', overflow: 'hidden' }}
          >
            <Box className="swiper">
              <Box className="swiper-wrapper">
                {sliderData.map((item, index) => (
                  <Slider
                    key={index}
                    href={item.href}
                    imgUrl={item.imgUrl}
                    title={item.title}
                    text={item.text}
                    offerText={item.offerText}
                    btnText={item.btnText}
                  />
                ))}
              </Box>
            </Box>

            {isUserAuthenticated ? (
              <Typography
                variant="h6"
                sx={{ paddingX: '20px', paddingTop: '10px' }}
              >
                Products
              </Typography>
            ) : (
              <Typography
                variant="h6"
                sx={{ paddingX: '20px', paddingTop: '10px' }}
              >
                Featured Products
              </Typography>
            )}
            <ProductCard filterData={filters} productData={featuredProducts} />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
