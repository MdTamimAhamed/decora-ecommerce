import {
	alpha,
	AppBar,
	Badge,
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	InputBase,
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
	const { isAuthenticated, user } = useAuth0();
	const { isUserAuthenticated, token, userInfo } = useSelector(
		(state) => state.auth
	);

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
						<Button size='small' color='inherit'>
							Become a seller
						</Button>

						{token && isUserAuthenticated ? (
							<>
								<Button
									variant='outlined'
									color='inherit'
									sx={{ gap: 1, textTransform: 'capitalize' }}>
									{userInfo.userName}
									<AccountCircleIcon />
								</Button>
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
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default CustomerNavbar;
