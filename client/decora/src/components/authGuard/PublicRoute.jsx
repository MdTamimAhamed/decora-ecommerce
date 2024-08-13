import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
	const { isUserAuthenticated } = useSelector((state) => state.auth);
	const { isAuthenticated } = useAuth0();

	const isAuthenticatedUser = isUserAuthenticated || isAuthenticated;
	return !isAuthenticatedUser ? children : <Navigate to='/' />;
}

export default PublicRoute;
