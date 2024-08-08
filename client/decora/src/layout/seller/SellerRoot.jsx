import Navbar from './SellerNavbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function SellerRoot() {
	return (
		<>
			<Navbar />
			<div>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
}

export default SellerRoot;
