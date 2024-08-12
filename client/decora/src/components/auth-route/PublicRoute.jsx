import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
	const { isUserAuthenticated, userInfo } = useSelector((state) => state.auth);
	return !isUserAuthenticated && !userInfo ? children : <Navigate to='/' />;
}

export default PublicRoute;
