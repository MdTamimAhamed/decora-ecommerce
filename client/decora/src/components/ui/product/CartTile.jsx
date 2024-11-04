import React from 'react';
import { Box, Checkbox, Divider, Paper, Typography } from '@mui/material';
import PriceFormatter from '../../reuseables/PriceFormatter.jsx';

const CartTile = ({
  cart,
  sellerDetails,
  productDetails,
  selectedItems,
  handleCheckboxChange,
}) => {
  return (
    <Paper variant="outlined" sx={{ padding: 3, width: '75%' }}>
      {cart.map((item, index) => {
        const sellerDetail = sellerDetails.find(
          (seller) => seller.sellerId === item.sellerId
        );
        const productDetail = productDetails.find(
          (product) => product._id === item.productId
        );

        return (
          <Box key={index}>
            {sellerDetail && (
              <Paper
                variant="outlined"
                sx={{ padding: 3, mt: 2 }}
                key={sellerDetail._id}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                  <img
                    src={sellerDetail?.profileImage}
                    style={{ width: '20px', height: '20px' }}
                    alt="seller_store_cover"
                  />
                  <Typography fontWeight={600}>
                    {sellerDetail.storeName}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <img
                    src={
                      productDetail.productBasicInformation.productImage.cover
                    }
                    height="70px"
                    width="70px"
                    alt="product_cover"
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 14,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        onClick={() =>
                          navigate(`/product/${productDetail.productCode}`)
                        }
                        sx={{
                          fontWeight: 500,
                          mb: 1,
                          ':hover': {
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {
                          productDetail.productBasicInformation.productInfo
                            .englishTitle
                        }
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <PriceFormatter price={item.price} />
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>
        );
      })}
    </Paper>
  );
};

export default CartTile;
