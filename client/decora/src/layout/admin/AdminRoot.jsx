import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function AdminRoot() {
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

export default AdminRoot;
