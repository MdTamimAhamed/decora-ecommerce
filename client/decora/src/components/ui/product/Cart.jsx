import {
  Container,
  Typography,
  Box,
  Skeleton,
  Paper,
  Button,
} from '@mui/material';
import CustomerNavbar from '../../../layout/customer/CustomerNavbar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { addCartLength } from '../../../features/seller/productSlice';
import CartTile from './CartTile.jsx';
import { toast } from 'react-toastify';

const Cart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [sellerDetails, setSellerDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const { userInfo } = useSelector((state) => state.auth);
  const { cartLength } = useSelector((state) => state.products);

  const cart = cartItems[0]?.cart;

  useEffect(() => {
    async function getCartItems() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/cart/get-cart-items`, {
          params: { customer_id: userInfo._id },
        });
        setCartItems(response.data.customerData);
        setSellerDetails(response.data.sellerData);
        setProductDetails(response.data.productData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCartItems();
  }, [userInfo._id]);

  useEffect(() => {
    dispatch(addCartLength({ length: cart?.length }));
  }, [cart?.length, dispatch]);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      const updatedSelectedItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(updatedSelectedItems);
    } else {
      const updatedSelectedItems = [...selectedItems, id];
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/cart/delete-cart-item`,
        {
          params: { cart_item_ids: selectedItems, customer_id: userInfo._id },
        }
      );
      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
        const updatedCartItems = cartItems.filter(
          (item) => !selectedItems.includes(item._id)
        );
        setCartItems(updatedCartItems);
        setSelectedItems([]);
        dispatch(addCartLength({ length: updatedCartItems.length }));
        window.location.reload();
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error('Error deleting selected items');
      console.log('cart error', error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.custom.custom_bg,
        minHeight: '80vh',
        mt: 2,
      }}
    >
      <CustomerNavbar cartLength={cartLength} />
      <Container maxWidth="xl">
        <Typography mt={2} variant="h6">
          Cart Items
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
            sx={{ mb: 2 }}
          >
            Delete Selected
          </Button>
        </Box>

        <Box
          sx={{
            pb: 10,
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexGrow: 1,
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={40} />
                <Skeleton variant="rectangular" width="50%" height={30} />
                <Skeleton variant="rectangular" width="20%" height={20} />
              </Box>
            ) : cartItems.length > 0 ? (
              <CartTile
                cart={cart}
                sellerDetails={sellerDetails}
                productDetails={productDetails}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={selectedItems}
              />
            ) : (
              <Typography>No items in the cart</Typography>
            )}
          </>
          <Paper
            variant="outlined"
            sx={{ padding: 2, width: '25%', height: 'fit-content' }}
          >
            Order summary
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
