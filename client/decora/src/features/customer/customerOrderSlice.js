import { createSlice } from '@reduxjs/toolkit';

const customerOrderSlice = createSlice({
	name: 'customerOrder',
	initialState: {
		customerOrderData: '',
	},
	reducers: {
		setCustomerOrderData: (state, action) => {
			state.customerOrderData = action.payload.data;
		},
	},
});

export const { setCustomerOrderData } = customerOrderSlice.actions;
export default customerOrderSlice.reducer;
