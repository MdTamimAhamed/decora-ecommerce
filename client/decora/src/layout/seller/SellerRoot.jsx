import { Box, Container, Paper, Typography } from '@mui/material';
import SellerNavbar from './SellerNavbar';
import { Outlet } from 'react-router-dom';

import React from 'react';
import { styled } from '@mui/material';

const StyledBackgroundImage = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '600px',
  backgroundImage: 'url(/seller_hero.jpg)',
  backgroundSize: 'cover',
  backgroundPositionY: ' 40%',
  backgroundRepeat: 'no-repeat',
}));

const Overlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'linear-gradient(45deg, rgba(0,0,0, 0.5), rgba(0,0,0, 0.4))',
}));

function SellerRoot() {
  return (
    <>
      <SellerNavbar />
      <Box>
        <Box sx={{ position: 'relative', width: '100%', height: '600px' }}>
          <StyledBackgroundImage />
          <Overlay>
            <Container maxWidth="xl">
              <Box sx={{ display: 'flex', gap: 20, mt: 14 }}>
                <Box>
                  <Typography variant="h2" fontWeight="700" color="white">
                    Become a Decora Seller!
                  </Typography>
                  <Typography color="white">
                    Create a Decora seller account now and reach millions of
                    customers!
                  </Typography>
                  <Box
                    position="relative"
                    component="img"
                    src="/seller_hero_illustration.png"
                    height="450px"
                    sx={{ zIndex: 1, mt: 5 }}
                  />
                  <Box
                    sx={{
                      borderRadius: '50%',
                      position: 'absolute',
                      bottom: '-20%',
                      left: '15%',
                      height: '20px',
                      width: '300px',
                      zIndex: 0,
                      bgcolor: 'rgba(0,0,0,0.1)',
                      filter: 'blur(8px)',
                    }}
                  ></Box>
                </Box>
                <Box sx={{ flexBasis: '35%' }}>
                  <Outlet />
                </Box>
              </Box>
            </Container>
          </Overlay>
        </Box>
        <Box>
          <Container maxWidth="xl">
            {/*will complete this static part in the end*/}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default SellerRoot;
