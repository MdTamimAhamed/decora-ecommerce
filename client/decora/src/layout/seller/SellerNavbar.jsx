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
	Typography,
} from '@mui/material';

function SellerNavbar() {
	return (
		<Box>
			<AppBar sx={{ bgcolor: 'white' }} position='static'>
				<Container maxWidth='xl'>
					<Toolbar
						disableGutters
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Typography
							sx={{ textDecoration: 'none' }}
							component='a'
							href='/'
							color='primary'
							variant='h5'
							fontWeight='600'>
							Decora Seller
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default SellerNavbar;
