import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
	name: 'products',
	initialState: {
		coverErrorMessage: null,
		filesErrorMessage: null,
		validationErrors: {},
	},
	reducers: {
		addCoverError: (state, action) => {
			state.coverErrorMessage = action.payload.message;
		},
		addFilesError: (state, action) => {
			state.filesErrorMessage = action.payload.message;
		},
		addValidationError: (state, action) => {
			state.validationErrors = action.payload.message;
		},
	},
});

export const { addCoverError, addFilesError, addValidationError } =
	productSlice.actions;
export default productSlice.reducer;
