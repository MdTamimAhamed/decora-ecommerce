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
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../features/auth/authSlice';

import LogoutIcon from '@mui/icons-material/Logout';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.3),
	width: '60%',
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
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { isAuthenticated, user, logout } = useAuth0();
	const { isUserAuthenticated, token, userInfo } = useSelector(
		(state) => state.auth
	);

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

	return (
		<Box>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'end',
							pt: '10px',
							gap: 2,
						}}>
						<Button size='small' color='inherit'>
							Help & Support
						</Button>
						<Button
							component={Link}
							to='/seller/login'
							size='small'
							color='inherit'>
							Become a seller
						</Button>

						{(token && isUserAuthenticated) || (isAuthenticated && user) ? (
							<>
								<Button
									onClick={handleClick}
									variant='outlined'
									color='inherit'
									sx={{
										gap: 1,
										textTransform: 'capitalize',
									}}>
									{(token && isUserAuthenticated && userInfo.userName) ||
										(isAuthenticated && user && user.name)}
									<AccountCircleIcon />
								</Button>
								<Box>
									<Menu
										id='basic-menu'
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											'aria-labelledby': 'basic-button',
										}}>
										<MenuItem>Profile</MenuItem>
										<MenuItem>My account</MenuItem>
										<MenuItem>Orders</MenuItem>
										<MenuItem>Wishlist</MenuItem>
										<MenuItem>My reviews</MenuItem>
										<MenuItem>Cancel orders</MenuItem>
										<MenuItem
											onClick={handleLogout}
											variant='text'
											size='small'>
											<LogoutIcon color='error' />
											<Typography
												variant='body2'
												color='error'
												fontWeight='600'
												ml='5px'>
												Logout
											</Typography>
										</MenuItem>
									</Menu>
								</Box>
							</>
						) : (
							<>
								<Button
									component={Link}
									to='/login'
									variant='outlined'
									size='small'
									color='inherit'>
									Login
								</Button>

								<Button
									component={Link}
									to='/signup'
									variant='outlined'
									size='small'
									color='inherit'>
									Signup
								</Button>
							</>
						)}
					</Box>

					<Toolbar
						disableGutters
						sx={{
							py: '10px',
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Box>
							<Typography variant='h5' fontWeight='600'>
								Decora
							</Typography>
						</Box>

						<Search>
							<StyledSearchIconWrapper>
								<SearchIcon />
							</StyledSearchIconWrapper>
							<StyledInputBase placeholder='Search...' />
						</Search>

						<Box>
							<IconButton color='inherit'>
								<Badge badgeContent={1} color='error'>
									<ShoppingCartOutlinedIcon />
								</Badge>
							</IconButton>
						</Box>
						<ToastContainer
							position='top-center'
							autoClose={1500}
							hideProgressBar
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable={false}
							pauseOnHover
							theme='dark'
						/>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default CustomerNavbar;
