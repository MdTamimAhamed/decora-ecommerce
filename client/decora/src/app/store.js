import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sellerVerificationReducer from '../features/seller/sellerVerificationSlice';
import productSlice from '../features/seller/productSlice';
import customerOrderReducer from '../features/customer/customerOrderSlice';
export default configureStore({
	reducer: {
		auth: authReducer,
		sellerVerify: sellerVerificationReducer,
		products: productSlice,
		customerOrder: customerOrderReducer,
	},
});
