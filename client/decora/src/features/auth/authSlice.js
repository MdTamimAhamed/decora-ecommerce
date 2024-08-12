import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		isUserAuthenticated: !!localStorage.getItem('sellerToken'),
		token: localStorage.getItem('sellerToken') || null,
		userInfo: JSON.parse(localStorage.getItem('user')) || null,
	},
	reducers: {
		login: (state, action) => {
			state.isUserAuthenticated = true;
			state.token = action.payload.token;
			localStorage.setItem('sellerToken', action.payload.token);
		},
		logout: (state) => {
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

export const { login, logout, user } = authSlice.actions;
export default authSlice.reducer;
