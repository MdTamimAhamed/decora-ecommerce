import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
	const { isUserAuthenticated, isSellerAuthenticated } = useSelector(
		(state) => state.auth
	);
	const { isAuthenticated } = useAuth0();

	const isAuthenticatedUser = isUserAuthenticated || isAuthenticated;
	if (isSellerAuthenticated) {
		return children;
	} else {
		return <Navigate to='/seller/login' />;
	}
}

export default PrivateRoute;
