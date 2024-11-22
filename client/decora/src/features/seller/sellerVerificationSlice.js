import { createSlice } from '@reduxjs/toolkit';

const sellerVerificationSlice = createSlice({
  name: 'sellerVerify',
  initialState: {
    currentStep: 2,
    sellerDocumentId: null,
    isSellerVerified: false,
  },
  reducers: {
    handleSteps: (state, action) => {
      state.currentStep = action.payload.step;
    },
    handleSellerDocumentId: (state, action) => {
      state.sellerDocumentId = action.payload.sellerDocumentId;
    },
    handleSellerVerificationStatus: (state, action) => {
      state.isSellerVerified = action.payload.isSellerVerified;
    },
  },
});

export const {
  handleSteps,
  handleSellerDocumentId,
  handleSellerVerificationStatus,
} = sellerVerificationSlice.actions;
export default sellerVerificationSlice.reducer;
