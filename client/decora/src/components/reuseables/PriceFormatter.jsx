import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const PriceFormatter = ({ price, fontSize, fontWeight, color }) => {
  const theme = useTheme();
  const formattedPrice = price?.toLocaleString();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <FaBangladeshiTakaSign
        fontSize={fontSize}
        color={color || theme.palette.common.black}
      />
      <Typography
        component={'span'}
        sx={{
          fontSize: fontSize || 18,
          fontWeight: fontWeight || 600,
          color: color || theme.palette.common.black,
        }}
      >
        {formattedPrice}
      </Typography>
    </Box>
  );
};

export default PriceFormatter;
