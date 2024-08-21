import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sellerVerificationReducer from '../features/seller/sellerVerificationSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		sellerVerify: sellerVerificationReducer,
	},
});
