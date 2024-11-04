import React, { useEffect } from 'react';
import { initializeSwiper } from '../../utils/swiper-slider.js';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const Slider = ({ title, text, offerText, btnText, imgUrl, href }) => {
  const theme = useTheme();
  useEffect(() => {
    initializeSwiper();
  }, []);
  return (
    <Box
      className="swiper-slide"
      sx={{
        position: 'relative',
        height: 400,
        backgroundImage: `url('${imgUrl}')` || '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(45deg,rgba(0, 0, 0, .9), rgba(0, 1, 0, 0.1))',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.common.white,
            mb: 1,
            fontSize: '14px',
            fontWeight: 300,
          }}
        >
          {offerText || 'Offer Text'}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {title || 'Add title'}
        </Typography>

        <Typography
          variant="body1"
          sx={{ maxWidth: '70%', mb: 4, fontWeight: 300 }}
        >
          {text || 'Short description'}
        </Typography>

        <Button
          href={href || '/'}
          color="secondary"
          variant="contained"
          disableElevation={true}
          sx={{
            px: 3,

            fontSize: '14px',
          }}
        >
          {btnText || 'Button'}
        </Button>
      </Box>
    </Box>
  );
};

export default Slider;
