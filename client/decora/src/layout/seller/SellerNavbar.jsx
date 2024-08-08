import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
	AppBar,
	Badge,
	Box,
	Container,
	IconButton,
	makeStyles,
	Toolbar,
} from '@mui/material';

function Navbar() {
	return (
		<div>
			<figure>Logo</figure>
			<AppBar>
				<Container maxWidth=''>
					<Toolbar
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<h3>Decora</h3>
						<Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
							<IconButton>
								<Badge badgeContent={0} color=''>
									<NotificationsOutlinedIcon color='' />
								</Badge>
							</IconButton>
							<SettingsIcon />
							<AccountCircleIcon />
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

export default Navbar;
