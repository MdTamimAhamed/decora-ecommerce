import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
	AppBar,
	Badge,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	styled,
	Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { sellerLogout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		left: 0,
		right: 5,
		top: 3,
		padding: '0 4px',
	},
}));

function DashboardNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		dispatch(sellerLogout());
		setTimeout(() => {
			navigate('/seller/login');
		}, 1000);
	}
	return (
		<>
			<Box>
				<Box
					sx={{ bgcolor: 'white', boxShadow: '0px 1px 0px rgba(0,0,0,0.1)' }}
					position='static'>
					<Container maxWidth='xl'>
						<Toolbar
							disableGutters
							sx={{
								display: 'flex',
								justifyContent: 'end',
								alignItems: 'center',
							}}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<IconButton>
									<StyledBadge badgeContent={1} color='error'>
										<NotificationsOutlinedIcon color='primary' />
									</StyledBadge>
								</IconButton>
								<IconButton>
									<AccountCircleIcon color='primary' />
								</IconButton>
								<Button variant='outlined' onClick={handleLogout}>
									Logout
								</Button>
							</Box>
						</Toolbar>
					</Container>
				</Box>
			</Box>
		</>
	);
}

export default DashboardNavbar;
