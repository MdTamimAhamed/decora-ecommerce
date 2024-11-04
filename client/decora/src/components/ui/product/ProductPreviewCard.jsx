import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { Rating } from '@mui/material';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { alpha, fontWeight } from '@mui/system';
import CustomerOrderMeasurements from './CustomerOrderMeasurements';
import { useState, useEffect } from 'react';
import OrderQuantity from '../../reuseables/OrderQuantity';
import { useDispatch } from 'react-redux';
import { setCustomerOrderData } from '../../../features/customer/customerOrderSlice';
import PriceFormatter from '../../reuseables/PriceFormatter.jsx';

const ProductPreviewCard = ({ data, sellerData }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const prodcutS1 = data?.productBasicInformation;
  const prodcutS2 = data?.productPriceStockAndVarient;
  const prodcutS3 = data?.productDescription;
  const prodcutS4 = data?.services;

  const images = prodcutS1?.productImage?.images || [];
  const colorVarient = data?.productPriceStockAndVarient?.colorVarient;

  const ratings = data?.ratings;
  const reviews = data?.reviews;
  const seller = sellerData?.[0];

  const [currentCover, setCurrentCover] = useState(
    prodcutS1?.productImage?.cover
  );
  const [currentColor, setCurrentColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customOrder, setCustomOrder] = useState({});
  const [customOrderCheck, setCustomOrderCheck] = useState(false);
  const [onlyCustomOrderCheck, setOnlyCustomOrderCheck] = useState(false);

  useEffect(() => {
    if (colorVarient) {
      setCurrentColor(colorVarient[0].colorFamily);
    }
  }, [colorVarient]);

  function handleCurrentCover(image) {
    setCurrentCover(image);
  }
  function handleCurrentColor(color) {
    setCurrentColor(color);
  }

  function addCustomOrder(checked) {
    setCustomOrderCheck(checked);
    if (checked) {
      setOnlyCustomOrderCheck(false);
    }
  }

  function addOnlyCustomOrder(checked) {
    setOnlyCustomOrderCheck(checked);
    if (checked) {
      setCustomOrderCheck(false);
    }
  }

  useEffect(() => {
    const customOrderData = {
      colorFamily: currentColor,
      quantity,
      customOrder,
      onlyCustomOrderCheck,
      customOrderCheck,
    };
    dispatch(setCustomerOrderData({ data: customOrderData }));
  }, [
    currentColor,
    quantity,
    customOrder,
    onlyCustomOrderCheck,
    customOrderCheck,
  ]);

  return (
    <Paper variant="outlined" sx={{ padding: 2, mt: 3, maxWidth: '1080px' }}>
      <Box sx={{ display: 'flex', gap: 5 }}>
        <Box sx={{ height: 'auto' }}>
          {/*-----------Product images-------------------------------*/}
          <img
            loading="lazy"
            src={currentCover || prodcutS1?.productImage?.cover}
            height="350px"
            width="350px"
            alt="product_cover"
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: 2,
            }}
          >
            <Box
              sx={{
                ':hover': {
                  outline: `2px solid ${theme.palette.success.main}`,
                },
              }}
            >
              <img
                loading="lazy"
                src={prodcutS1?.productImage?.cover}
                onClick={() =>
                  handleCurrentCover(prodcutS1?.productImage?.cover)
                }
                style={{ cursor: 'pointer' }}
                height="100%"
                width="70px"
              />
            </Box>

            {images.map((item, index) => (
              <Box
                key={index}
                sx={{
                  ':hover': {
                    outline: `2px solid ${theme.palette.success.main}`,
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={item}
                  onClick={() => handleCurrentCover(item)}
                  style={{ cursor: 'pointer' }}
                  height="100%"
                  width="70px"
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/*-----------Product details-------------------------------*/}
        <Box>
          <Typography sx={{ fontSize: '20px' }}>
            {prodcutS1?.productInfo?.englishTitle}
          </Typography>
          <PriceFormatter price={prodcutS2?.productPrice} fontSize={22} />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <Rating value={ratings?.totalRating || 0} readOnly />
            <Typography variant="subtitle2">
              reviews({reviews?.totalReview || 0})
            </Typography>
          </Box>

          <Box my={1}>
            <Typography
              component="span"
              color={theme.palette.common.black}
              sx={{ fontWeight: 600, mr: 1 }}
            >
              Store:
            </Typography>
            <Typography
              component={Link}
              to="/store"
              sx={{
                color: theme.palette.success.main,
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Visit the '{seller?.storeName}' store!
            </Typography>
          </Box>
          <Divider />

          <Box mt={3}>
            <Typography color={theme.palette.success.main}>
              In Stock!
              <Typography
                ml={1}
                component="span"
                color={theme.palette.common.black}
              >
                {`(${prodcutS2?.productQuantity})`}
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={700}>
              Product Material:
              <Typography ml={1} component="span">
                {prodcutS1?.productInfo?.material}
              </Typography>
            </Typography>
          </Box>
          <Typography fontWeight={700}>Measurements:</Typography>
          <Paper
            variant="outlined"
            sx={{ paddingY: 1, paddingX: 2, display: 'flex', gap: 3 }}
          >
            <Typography>
              Height: {prodcutS2?.productMeasurement[0]?.height},
            </Typography>
            <Typography>
              Width/Deepth: {prodcutS2?.productMeasurement[0]?.width},
            </Typography>
            <Typography>
              Length: {prodcutS2?.productMeasurement[0]?.length}
            </Typography>
          </Paper>

          <Box mt={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography fontWeight={700}>Color:</Typography>
              {colorVarient &&
                colorVarient.map((item) => (
                  <Button
                    disableRipple
                    variant={
                      currentColor === item.colorFamily
                        ? 'contained'
                        : 'outlined'
                    }
                    size="small"
                    sx={{
                      textTransform: 'capitalize',
                      color:
                        currentColor === item.colorFamily
                          ? theme.palette.common.white
                          : null,
                      bgcolor:
                        currentColor === item.colorFamily
                          ? theme.palette.error.main
                          : null,
                    }}
                    onClick={() => handleCurrentColor(item.colorFamily)}
                    key={item._id}
                  >
                    {item.colorFamily}
                  </Button>
                ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2 }}>
              {colorVarient &&
                colorVarient.map((item) =>
                  item.image ? (
                    <Box
                      key={item._id}
                      sx={{
                        ':hover': {
                          outline: `2px solid ${theme.palette.success.main}`,
                        },
                      }}
                    >
                      <img
                        src={item.image}
                        onClick={() => handleCurrentColor(item.colorFamily)}
                        height="100%"
                        width="60px"
                        alt="color_varient_images"
                      />
                    </Box>
                  ) : null
                )}
            </Box>

            <Box>
              <Typography fontWeight={700}>Quantity:</Typography>
              <OrderQuantity
                state={quantity}
                setState={setQuantity}
                maxQuantity={10}
                minQuantity={1}
              />
            </Box>
          </Box>

          {/* custom order section : user can select measurements to place the custom order */}
          <Box mt={2}>
            <Divider />
            {prodcutS2?.customOrder?.check && (
              <>
                <Typography fontWeight={700} mt={2}>
                  Custom order:
                  <span
                    style={{
                      fontWeight: 400,
                      color: theme.palette.success.main,
                    }}
                  >
                    {prodcutS2?.customOrder?.check && (
                      <span>
                        We accept custom order for this product! Use the
                        checkbox if you only want to place a custom order.
                      </span>
                    )}
                  </span>
                </Typography>
              </>
            )}
          </Box>
          {prodcutS2?.customOrder?.check && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={customOrderCheck}
                    onChange={(e) => addCustomOrder(e.target.checked)}
                  />
                }
                label="+ Add custom order"
                name="add-image-check"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyCustomOrderCheck}
                    onChange={(e) => addOnlyCustomOrder(e.target.checked)}
                  />
                }
                label="Only custom order"
                name="add-image-check"
              />

              {customOrderCheck || onlyCustomOrderCheck ? (
                <CustomerOrderMeasurements
                  data={data}
                  state={customOrder}
                  setState={setCustomOrder}
                />
              ) : null}
            </>
          )}

          <Divider />
          <Box my={2}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Description:
            </Typography>
            {parse(prodcutS3 || '')}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductPreviewCard;
