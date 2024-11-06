import {
  alpha,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../features/auth/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  width: '40%',
}));

const StyledSearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0, 2),
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 6),
  },
}));

function CustomerNavbar() {
  const theme = useTheme();
  const [close, setClose] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAuthenticated, user, logout } = useAuth0();
  const { isUserAuthenticated, isSellerAuthenticated, userInfo } = useSelector(
    (state) => state.auth
  );
  const { cartLength } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
      toast.success('Auth0: You logged out!');
    } else {
      dispatch(userLogout());
      toast.success('You logged out!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }

  function handleCartLink() {
    if (isAuthenticated || isUserAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
      toast.error('Please login to view cart');
    }
  }

  return (
    <Box pb={8}>
      <AppBar>
        {/*{!close ? (*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      display: 'flex',*/}
        {/*      justifyContent: 'center',*/}
        {/*      items: 'center',*/}
        {/*      width: '100%',*/}
        {/*      bgcolor: theme.palette.warning.main,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Typography sx={{ fontSize: '12px' }}>working on it...</Typography>*/}
        {/*    <CloseIcon*/}
        {/*      sx={{ fontSize: '14px', cursor: 'pointer', mt: '2px' }}*/}
        {/*      onClick={() => setClose(true)}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*) : null}*/}

        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              py: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                onClick={() => navigate('/')}
                mb={2}
                sx={{ cursor: 'pointer' }}
                variant="h5"
                color="white"
                fontWeight="400"
              >
                Decora
                <Typography
                  fontWeight={200}
                  fontSize={12}
                  component="p"
                  lineHeight="5px"
                  letterSpacing={1}
                >
                  E-commerce
                </Typography>
              </Typography>
            </Box>
            <Search>
              <StyledSearchIconWrapper>
                <SearchIcon />
              </StyledSearchIconWrapper>
              <StyledInputBase placeholder="Search..." />
            </Search>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                pt: '10px',
                gap: 2,
              }}
            >
              {isSellerAuthenticated ? (
                <Button
                  component={Link}
                  to="/seller-login"
                  size="small"
                  sx={{
                    color: theme.palette.common.white,
                    bgcolor: theme.palette.secondary.main,
                    px: 3,
                  }}
                >
                  Become a seller
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/seller-login"
                  size="small"
                  sx={{
                    color: theme.palette.common.white,
                    bgcolor: theme.palette.secondary.main,
                    px: 2,
                  }}
                >
                  Become a seller
                </Button>
              )}

              {isUserAuthenticated || (isAuthenticated && user) ? (
                <>
                  <Button
                    onClick={handleClick}
                    variant="outlined"
                    color="inherit"
                    sx={{
                      gap: 1,
                      textTransform: 'capitalize',
                    }}
                  >
                    {(isUserAuthenticated && userInfo.userName) ||
                      (isAuthenticated && user && user.name)}
                    <AccountCircleIcon />
                  </Button>
                  <Box>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem>Orders</MenuItem>
                      <MenuItem>Wishlist</MenuItem>
                      <MenuItem>My reviews</MenuItem>
                      <MenuItem>Cancel orders</MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        variant="text"
                        size="small"
                      >
                        <LogoutIcon color="error" />
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight="600"
                          ml="5px"
                        >
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Box>
                    <IconButton color="inherit">
                      <Badge badgeContent={cartLength || 0} color="error">
                        <ShoppingCartOutlinedIcon onClick={handleCartLink} />
                      </Badge>
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                    color="inherit"
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    size="small"
                    color="inherit"
                  >
                    Signup
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default CustomerNavbar;
