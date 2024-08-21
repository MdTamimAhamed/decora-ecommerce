import { createSlice, current } from '@reduxjs/toolkit';

const sellerVerificationSlice = createSlice({
	name: 'sellerVerify',
	initialState: {
		currentStep: 0,
	},
	reducers: {
		handleSteps: (state, action) => {
			state.currentStep = action.payload.step;
		},
	},
});

export const { handleSteps } = sellerVerificationSlice.actions;
export default sellerVerificationSlice.reducer;
