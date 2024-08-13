import { Box } from '@mui/material';
import SellerNavbar from './SellerNavbar';
import { Outlet } from 'react-router-dom';

function SellerRoot() {
	return (
		<>
			<SellerNavbar />
			<Box>
				<Outlet />
			</Box>
		</>
	);
}

export default SellerRoot;
