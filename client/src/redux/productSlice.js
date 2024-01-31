import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    },
    getProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductStart: (state) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.productData.push(action.payload);
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.productData = state.productData.map((product) => {
        return product._id === action.payload._id ? action.payload : product;
      });
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.productData = state.productData.filter(
        (product) => product._id !== action.payload._id
      );
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
