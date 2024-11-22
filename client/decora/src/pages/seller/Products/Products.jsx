import {
  alpha,
  Box,
  Button,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import StoreSetup from '../../../components/forms/seller-product-forms/StoreSetup';
import AddressVerification from '../../../components/forms/seller-product-forms/AddressVerification';
import NIDVerification from '../../../components/forms/seller-product-forms/NIDVerification';
import BankDetails from '../../../components/forms/seller-product-forms/BankDetails';
import axios from 'axios';
import ReactLoading from 'react-loading';
import PublishedProducts from './PublishedProducts';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/BaseURL';
import { useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleSellerVerificationStatus } from '../../../features/seller/sellerVerificationSlice.js';

const StyledBackgroundImage = styled(Box)(() => ({
  marginTop: '20px',
  width: '100%',
  height: '200px',
  backgroundImage: 'url(src/assets/dashboard_product_image.jpg)',
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
  backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.1))',
}));

function Products() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSellerVerified, setIsSellerVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const { currentStep } = useSelector((state) => state.sellerVerify);

  useEffect(() => {
    const getUserVerificationConfirmation = async () => {
      const token = localStorage.getItem('sellerToken');
      try {
        const response = await axios.get(
          `${baseUrl}/api/seller/confirm-verification`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          const { verified } = response.data;
          dispatch(
            handleSellerVerificationStatus({ isSellerVerified: verified })
          );
          setIsSellerVerified(verified);
        }
      } catch (error) {
        if (error.response && error.response.data.error === 'jwt expired') {
          toast.error('Session expired! Please log in again!');
          setInterval(() => {
            localStorage.removeItem('sellerToken');
          }, 1000);
        } else {
          console.error('Something went wrong!', error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getUserVerificationConfirmation();
  }, []);

  const handleAddProductsClick = () => {
    if (!isSellerVerified) {
      toast.error('Please complete the following 4 steps to add products!');
    } else {
      navigate('/products/add-products');
    }
  };

  const steps = [
    'Store Setup',
    'Address Verification',
    'NID Verification',
    'Bank Details',
  ];
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <StyledBackgroundImage />
        <Overlay>
          <Box padding={4}>
            <Typography variant="h4" fontWeight={700} color="white">
              Product Creation
            </Typography>
            <Typography color="white">
              Instently create product and showcase it on your store!
            </Typography>
            <Button
              disableElevation={true}
              variant="contained"
              onClick={handleAddProductsClick}
              sx={{
                bgcolor: 'white',
                color: 'black',
                marginTop: '25px',
                fontWeight: 600,
                '&:hover': {
                  color: theme.palette.primary.main,
                  bgcolor: 'white',
                },
              }}
            >
              Add Products +
            </Button>
          </Box>
        </Overlay>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <ReactLoading type="bubbles" color={theme.palette.primary.main} />
        </Box>
      ) : !isSellerVerified ? (
        <>
          <Box sx={{ width: '100%', mb: 10 }}>
            <Divider sx={{ mt: '20px' }} />
            <Typography
              variant="h6"
              color="error"
              sx={{ textAlign: 'center', my: '40px', fontWeight: '600' }}
            >
              Please complete the following steps to add your first product to
              the store and start selling!
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mt: '2px',
                        lineHeight: '8px',
                        fontSize: '0.8em',
                        color: theme.palette.grey[500],
                      }}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Typography>
                  </Step>
                ))}
              </Stepper>

              <Paper variant="outlined" sx={{ mt: 6 }}>
                {currentStep === 0 && <StoreSetup />}
                {currentStep === 1 && <AddressVerification />}
                {currentStep === 2 && <NIDVerification />}
                {currentStep === 3 && (
                  <BankDetails setState={setIsSellerVerified} />
                )}
              </Paper>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Paper
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '150px',
                borderStyle: 'dashed',
                borderWidth: '2px',
                bgcolor: alpha(theme.palette.warning.light, 0.1),
                borderColor: alpha(theme.palette.warning.light, 0.8),
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  padding: '10px',
                  borderColor: theme.palette.warning.light,
                  color: theme.palette.warning.light,
                  ':hover': { borderColor: theme.palette.warning.light },
                }}
                onClick={handleAddProductsClick}
              >
                Add Products +
              </Button>
            </Paper>
          </Box>

          {/* <Box sx={{ height: '200px' }}>
						<Outlet />
					</Box> */}

          <Box mt={5}>
            <Typography variant="h6">Published Products</Typography>
            <PublishedProducts />
          </Box>
        </>
      )}
    </>
  );
}

export default Products;
