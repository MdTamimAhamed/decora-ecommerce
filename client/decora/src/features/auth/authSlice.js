import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		isUserAuthenticated: !!localStorage.getItem('sellerToken'),
		userInfo: JSON.parse(localStorage.getItem('user')) || null,
	},
	reducers: {
		userLogin: (state, action) => {
			state.isUserAuthenticated = true;

			localStorage.setItem('sellerToken', action.payload.token);
		},
		userLogout: (state) => {
			state.isUserAuthenticated = false;
			state.userInfo = null;
			localStorage.removeItem('sellerToken');
			localStorage.removeItem('user');
		},
		user: (state, action) => {
			state.userInfo = action.payload.userInfo;
			localStorage.setItem('user', JSON.stringify(action.payload.userInfo));
		},
	},
});

export const { userLogin, userLogout, user } = authSlice.actions;
export default authSlice.reducer;
