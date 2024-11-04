import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductTile from './ProductTile.jsx';

const ProductCard = ({ filterData, productData }) => {
  const { category, price, rating } = filterData || {};

  const noFiltersApplied = !category?.length && !price && !rating;

  const filteredProducts = noFiltersApplied
    ? productData
    : productData.filter((product) => {
        const productCategory =
          product?.productBasicInformation?.productInfo?.category;
        const productPrice = Number(
          product?.productPriceStockAndVarient?.productPrice
        );
        const productRating = Number(product?.ratings?.totalRating);

        const categoryMatch =
          category?.length > 0 ? category.includes(productCategory) : false;
        const priceMatch = price
          ? productPrice >= price[0] && productPrice <= price[1]
          : false;
        const ratingMatch = rating ? productRating >= Number(rating) : false;

        return (
          (categoryMatch && priceMatch && ratingMatch) ||
          (categoryMatch && priceMatch) ||
          (categoryMatch && ratingMatch) ||
          (priceMatch && ratingMatch) ||
          categoryMatch ||
          priceMatch ||
          ratingMatch
        );
      });

  return (
    <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductTile key={product._id} product={product} />
        ))
      ) : (
        <Typography>No results found!</Typography>
      )}
    </Box>
  );
};

export default ProductCard;
