import React from 'react';
import { Card, CardContent, Rating, Typography } from '@mui/material';
import PriceFormatter from '../../reuseables/PriceFormatter.jsx';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const ProductTile = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  function handleProductPreview(prod_id) {
    navigate(`/product/${prod_id}`);
  }
  return (
    <Card
      onClick={() => handleProductPreview(product.productCode)}
      variant="outlined"
      sx={{
        width: 258,
        ':hover': {
          boxShadow: '0px 1px 10px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent variant="outlined">
        <img
          height={210}
          width="100%"
          src={product.productBasicInformation.productImage.cover}
        />
        <Typography
          sx={{
            fontSize: 14,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            ':hover': {
              color: theme.palette.custom.dark_red,
            },
          }}
        >
          {product.productBasicInformation.productInfo.englishTitle}
        </Typography>
        <Rating
          sx={{ mt: 1 }}
          value={product.ratings?.totalRating || 0}
          readOnly
        />

        <PriceFormatter
          price={product.productPriceStockAndVarient.productPrice}
        />
      </CardContent>
    </Card>
  );
};

export default ProductTile;
