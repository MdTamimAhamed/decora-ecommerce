import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		isUserAuthenticated: !!localStorage.getItem('customerToken'),
		isSellerAuthenticated: !!localStorage.getItem('sellerToken'),
		sellerInfo: JSON.parse(localStorage.getItem('seller')) || null,
		userInfo: JSON.parse(localStorage.getItem('user')) || null,
	},
	reducers: {
		userLogin: (state, action) => {
			state.isUserAuthenticated = true;
			localStorage.setItem('customerToken', action.payload.token);
		},
		sellerLogin: (state, action) => {
			(state.isSellerAuthenticated = true),
				localStorage.setItem('sellerToken', action.payload.sellerToken);
		},

		userLogout: (state) => {
			state.isUserAuthenticated = false;
			state.userInfo = null;
			localStorage.removeItem('customerToken');
			localStorage.removeItem('user');
		},
		sellerLogout: (state) => {
			state.isSellerAuthenticated = false;
			state.sellerInfo = null;
			localStorage.removeItem('sellerToken');
			localStorage.removeItem('seller');
		},

		user: (state, action) => {
			state.userInfo = action.payload.userInfo;
			localStorage.setItem('user', JSON.stringify(action.payload.userInfo));
		},
		seller: (state, action) => {
			state.sellerInfo = action.payload.sellerInfo;
			localStorage.setItem('seller', JSON.stringify(action.payload.sellerInfo));
		},
	},
});

export const {
	userLogin,
	sellerLogin,
	userLogout,
	sellerLogout,
	seller,
	user,
} = authSlice.actions;
export default authSlice.reducer;
