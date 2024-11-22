import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import InputFileUpload from '../../reuseables/InputFileUpload';
import { alpha } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  handleSellerDocumentId,
  handleSteps,
} from '../../../features/seller/sellerVerificationSlice';
import { useSelector } from 'react-redux';
import ErrorMessage from '../form-controllers/ErrorMessage';
import Loader from '../../reuseables/Loader.jsx';

function StoreSetup() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [storeName, setStoreName] = useState('');
  const [storeSubtitle, setStoreSubtitle] = useState('');
  const [profileImage, setProfileImage] = useState({});
  const [msg, setMsg] = useState([]);
  const [errorMsg, setError] = useState({});
  const [loading, setloading] = useState(false);

  const { sellerInfo } = useSelector((state) => state.auth);
  const sellerId = sellerInfo._id;

  async function handleStoreSetup(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('storeSubtitle', storeSubtitle);
    formData.append('profileImage', profileImage);
    formData.append('sellerId', sellerId);

    try {
      setloading(true);
      const response = await axios.post(
        `${baseUrl}/api/seller/products/store-setup`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.status === 200) {
        const { message, sellerDocumentId } = response.data;
        dispatch(
          handleSellerDocumentId({ sellerDocumentId: sellerDocumentId })
        );
        setMsg(message[0]);
        toast.success(message[1]);
        setTimeout(() => {
          dispatch(handleSteps({ step: 1 }));
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        toast.error('Signup failed!');
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <Box
      component="form"
      sx={{ maxWidth: '768px', margin: 'auto', padding: '30px' }}
    >
      <Typography variant="h6" fontWeight={500}>
        Store Information
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
        <Box sx={{ flex: '0 1 100%' }}>
          <InputHandler
            labelName="Store Name"
            type="text"
            state={storeName}
            setState={setStoreName}
            placeholder="Enter store name"
            autoComplete="nope"
          />
          <ErrorMessage check={errorMsg.storeName} mt="0px" />
        </Box>
        <InputHandler
          labelName="Store Subtitle"
          type="text"
          state={storeSubtitle}
          setState={setStoreSubtitle}
          placeholder="Subtitle/tag/slogun (optional)"
          autoComplete="nope"
        />
      </Box>

      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.4)' }}>
        Upload Store/Profile Image
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          mt: '2px',
          borderStyle: 'dashed',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <InputFileUpload setState={setProfileImage} />
          {profileImage && <Typography>{profileImage.name}</Typography>}
          <Typography
            variant="subtitle2"
            color={alpha(theme.palette.primary.main, 0.5)}
          >
            {msg}
          </Typography>
        </Box>
      </Paper>

      <Button
        onClick={handleStoreSetup}
        variant="contained"
        sx={{ mt: 2, gap: 1 }}
      >
        Next {loading && <Loader size="xs" type="spin" />}
      </Button>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
}

export default StoreSetup;
