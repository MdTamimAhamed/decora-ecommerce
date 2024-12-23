import { Paper, alpha, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSteps } from '../../../features/seller/sellerVerificationSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { baseUrl } from '../../../utils/BaseURL';
import { useSelector } from 'react-redux';
import InputHandler from '../form-controllers/InputHandler';
import InputFileUpload from '../../reuseables/InputFileUpload';
import axios from 'axios';
import ErrorMessage from '../form-controllers/ErrorMessage';
import Loader from '../../reuseables/Loader.jsx';

function NIDVerification() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [nidName, setNidName] = useState('');
  const [nidNumber, setNidNumber] = useState('');

  const [errorMsg, setError] = useState({});
  const [loading, setloading] = useState(false);

  const { sellerDocumentId } = useSelector((state) => state.sellerVerify);

  async function handleNIDVerification(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nidFront', nidFront);
    formData.append('nidBack', nidBack);
    formData.append('nidName', nidName);
    formData.append('nidNumber', nidNumber);
    formData.append('sellerDocumentId', sellerDocumentId);

    try {
      setloading(true);
      const response = await axios.post(
        `${baseUrl}/api/seller/products/nid-verification`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
        setTimeout(() => {
          dispatch(handleSteps({ step: 3 }));
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
      sx={{
        position: 'relative',
        maxWidth: '768px',
        margin: 'auto',
        padding: '30px',
      }}
    >
      <Box>
        <Typography
          sx={{
            bgcolor: alpha(theme.palette.warning.light, 0.2),
            p: 1,
            color: theme.palette.warning.main,
            position: 'absolute',
            fontSize: '13px',
            width: '150px',
            left: '-20%',
            top: '25%',
          }}
        >
          Practice project: No need to use real NID just use any random image!
        </Typography>
      </Box>
      <Typography variant="h6" mb={1} fontWeight={500}>
        NID Verification
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        {/* nid front */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle" sx={{ color: 'rgba(0,0,0,0.4)' }}>
            Upload NID Front
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              flexBasis: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              mt: '2px',
              borderStyle: 'dashed',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <InputFileUpload setState={setNidFront} />
              {nidFront && (
                <Typography variant="subtitle2">{nidFront.name}</Typography>
              )}
            </Box>
          </Paper>
        </Box>

        {/* nidback */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle" sx={{ color: 'rgba(0,0,0,0.4)' }}>
            Upload NID Back
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
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <InputFileUpload setState={setNidBack} />
              {nidBack && (
                <Typography variant="subtitle2">{nidBack.name}</Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box mt={1}>
        <InputHandler
          labelName="NID Name"
          state={nidName}
          setState={setNidName}
          placeholder="Enter NID Name"
        />
        <ErrorMessage check={errorMsg.nidName} />
        <InputHandler
          labelName="NID Number"
          state={nidNumber}
          setState={setNidNumber}
          placeholder="Enter NID Number"
        />
        <ErrorMessage check={errorMsg.nidNumber} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => dispatch(handleSteps({ step: 1 }))}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleNIDVerification}>
          Next {loading && <Loader size="xs" type="spin" />}
        </Button>
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

export default NIDVerification;
