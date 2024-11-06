import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    prodId: null,
    validationErrors: {},
    cartLength: isNaN(Number(localStorage.getItem('_total_cart_items')))
      ? 0
      : Number(localStorage.getItem('_total_cart_items')),
  },
  reducers: {
    addProdId: (state, action) => {
      state.prodId = action.payload.id;
    },
    addCartLength: (state, action) => {
      state.cartLength = action.payload.length;
      localStorage.setItem('_total_cart_items', action.payload.length);
    },
    addValidationError: (state, action) => {
      state.validationErrors = action.payload.message;
    },
  },
});

export const { addProdId, addCartLength, addValidationError } =
  productSlice.actions;
export default productSlice.reducer;
