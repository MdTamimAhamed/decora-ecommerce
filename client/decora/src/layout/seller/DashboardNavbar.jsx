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

function DashboardNavbar() {
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
								Decora
							</Typography>
							<Box>
								<IconButton>
									<NotificationsOutlinedIcon />
								</IconButton>
								<IconButton>
									<AccountCircleIcon />
								</IconButton>
							</Box>
						</Toolbar>
					</Container>
				</Box>
			</Box>
		</>
	);
}

export default DashboardNavbar;
