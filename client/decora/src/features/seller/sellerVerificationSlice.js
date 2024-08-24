import { createSlice } from '@reduxjs/toolkit';

const sellerVerificationSlice = createSlice({
	name: 'sellerVerify',
	initialState: {
		currentStep: 0,
		sellerDocumentId: null,
	},
	reducers: {
		handleSteps: (state, action) => {
			state.currentStep = action.payload.step;
		},
		handleSellerDocumentId: (state, action) => {
			state.sellerDocumentId = action.payload.sellerDocumentId;
		},
	},
});

export const { handleSteps, handleSellerDocumentId } =
	sellerVerificationSlice.actions;
export default sellerVerificationSlice.reducer;
