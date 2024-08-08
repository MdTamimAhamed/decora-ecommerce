import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authentication',
	initialState: {
		isAuthenticated: false,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			localStorage.setItem('sellerToken', action.payload.token);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			localStorage.removeItem('sellerToken');
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
