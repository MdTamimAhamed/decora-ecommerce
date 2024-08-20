import {
	Box,
	Divider,
	ListItemText,
	MenuItem,
	MenuList,
	Typography,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';
import SearchBar from '../../components/reuseables/SearchBar';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlagIcon from '@mui/icons-material/Flag';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';

function Sidebar() {
	const theme = useTheme();

	const navOptions = [
		{ id: 0, name: 'Products', icon: <WarehouseIcon /> },
		{ id: 1, name: 'My Store', icon: <StoreIcon /> },
		{ id: 2, name: 'Dashboard', icon: <DashboardIcon /> },
		{ id: 3, name: 'Orders', icon: <ViewListIcon /> },
		{ id: 4, name: 'Customers', icon: <PeopleIcon /> },
		{ id: 5, name: 'Analytics', icon: <BarChartIcon /> },
		{ id: 6, name: 'Reports', icon: <FlagIcon /> },
		{ id: 7, name: 'Content Management', icon: <ManageAccountsIcon /> },
		{ id: 8, name: 'Supports', icon: <SupportAgentIcon /> },
		{ id: 9, name: 'Settings', icon: <SettingsIcon /> },
	];
	return (
		<Box
			sx={{
				minWidth: '260px',
				height: '100vh',
				boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
				bgcolor: theme.palette.primary.main,
				padding: '12px',
			}}>
			<Box sx={{ textAlign: 'center' }}>
				<Typography
					mb={8}
					sx={{ fontFamily: 'Caveat' }}
					variant='h2'
					color='white'
					fontWeight='800'>
					Decora
					<Typography component='p' lineHeight='5px' variant='subtitle1'>
						E-commerce
					</Typography>
				</Typography>
			</Box>
			<Box my={2}>
				<SearchBar placeholder='Search...' iconColor='primary' />
			</Box>
			<Divider />
			<Box>
				<MenuList>
					{navOptions.map((item) => (
						<MenuItem key={item.id}>
							<Typography color='white'>{item.icon}</Typography>
							<ListItemText sx={{ ml: '10px', color: 'white' }}>
								{item.name}
							</ListItemText>
						</MenuItem>
					))}
				</MenuList>
			</Box>
		</Box>
	);
}

export default Sidebar;
