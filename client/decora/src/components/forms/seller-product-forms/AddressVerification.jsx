import {
  alpha,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputHandler from '../form-controllers/InputHandler';
import { handleSteps } from '../../../features/seller/sellerVerificationSlice';
import CountrySelector from '../../reuseables/CountrySelector';

import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { useSelector } from 'react-redux';
import ErrorMessage from '../form-controllers/ErrorMessage';
import Loader from '../../reuseables/Loader.jsx';

function AddressVerification() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [country, setCountry] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');

  const [errorMsg, setError] = useState({});
  const [loading, setloading] = useState(false);

  const { sellerDocumentId } = useSelector((state) => state.sellerVerify);

  async function handleAddressVerification(e) {
    e.preventDefault();

    try {
      setloading(true);
      const response = await axios.post(
        `${baseUrl}/api/seller/products/address-verification`,
        { country, district, area, postCode, address, sellerDocumentId },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
        setTimeout(() => {
          dispatch(handleSteps({ step: 2 }));
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
      <Typography variant="h6" mb={1} fontWeight={500}>
        Address Verification
      </Typography>
      <Box>
        <CountrySelector
          size="small"
          selectOption="country"
          label="Choose a country"
          setState={setCountry}
        />
        <ErrorMessage check={errorMsg.country} />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <CountrySelector
            size="small"
            selectOption="district"
            label="Select your district"
            setState={setDistrict}
          />
          <CountrySelector
            size="small"
            selectOption="area"
            label="Select your area/city"
            setState={setArea}
          />
          <InputHandler
            type="text"
            state={postCode}
            setState={setPostCode}
            placeholder="Enter postal code"
            autoComplete="nope"
          />
        </Box>
        <ErrorMessage
          check={errorMsg.district || errorMsg.area || errorMsg.postCode}
        />
        <Box>
          <TextareaAutosize
            minRows={5}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: '97.2%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none',
              outlineColor: `${theme.palette.primary.main}`,
            }}
          />
        </Box>
        <ErrorMessage check={errorMsg.address} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => dispatch(handleSteps({ step: 0 }))}
          >
            Back
          </Button>
          <Button variant="contained" onClick={handleAddressVerification}>
            Next {loading && <Loader size="xs" type="spin" />}
          </Button>
        </Box>
      </Box>

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

export default AddressVerification;
