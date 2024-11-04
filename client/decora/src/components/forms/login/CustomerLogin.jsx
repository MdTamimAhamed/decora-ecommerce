import { Box, Button, Container, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import InputHandler from '../form-controllers/InputHandler';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/BaseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from '../form-controllers/ErrorMessage';
import { useAuth0, User } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { userLogin, user } from '../../../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setError] = useState({});

  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleFormSubmission(e) {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/api/customer/login`,
        formData,
        {
          headers: {
            'Content-Type': 'Application/json',
          },
        }
      );

      if (response.status === 200) {
        const { message, token } = response.data;

        if (token) {
          const userInfo = jwtDecode(token);
          dispatch(user({ userInfo: userInfo }));
          dispatch(userLogin({ token: token }));

          navigate('/');
          toast.success(message);
        }
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        toast.error(error.response.data.message);
      }
    }
  }
  return (
    <>
      <Box>
        <Container maxWidth="xl">
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: '400px',
              mt: '2rem',
            }}
          >
            <Typography variant="h5" py="20px" fontWeight="500">
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleFormSubmission}
              bgcolor="white"
              padding="40px"
              sx={{ boxShadow: '0px 3px 10px rgba(0,0,0,0.1)' }}
            >
              <Box
                sx={{
                  gap: 6,
                }}
              >
                <Box>
                  <InputHandler
                    type="email"
                    state={email}
                    setState={setEmail}
                    labelName="Email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                  <ErrorMessage check={errorMsg.email} />

                  <InputHandler
                    type="password"
                    state={password}
                    setState={setPassword}
                    labelName="Password"
                    placeholder="Password"
                  />
                  <ErrorMessage check={errorMsg.password} />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: '20px', py: '8px' }}
                  >
                    Login
                  </Button>

                  <Divider sx={{ mt: '20px' }}>
                    <Box>
                      <Typography variant="subtitle2">
                        Or signin with
                      </Typography>
                    </Box>
                  </Divider>

                  <Button
                    onClick={() => loginWithRedirect()}
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: 'capitalize',
                      mt: '10px',
                      py: '5px',
                      gap: 1,
                    }}
                  >
                    <FcGoogle fontSize="20px" />
                    <Typography variant="subtitle1" color="inherit">
                      Google
                    </Typography>
                  </Button>

                  <Typography variant="subtitle2" sx={{ mt: '20px' }}>
                    Create an account{' '}
                    <Typography
                      component={Link}
                      to="/signup"
                      color="primary"
                      variant="subtitle2"
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Signup
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CustomerLogin;
