import { createSlice } from "@reduxjs/toolkit";
export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchaseData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getPurchaseStart: (state) => {
      state.loading = true;
    },
    getPurchaseSuccess: (state, action) => {
      state.loading = false;
      state.purchaseData = action.payload;
    },
    getPurchaseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPurchaseStart: (state) => {
      state.loading = true;
    },
    addPurchaseSuccess: (state, action) => {
      state.loading = false;
      state.purchaseData.push(action.payload);
    },
    addPurchaseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePurchaseStart: (state) => {
      state.loading = true;
    },
    updatePurchaseSuccess: (state, action) => {
      state.loading = false;
      state.purchaseData = state.purchaseData.map((purchase) => {
        return purchase._id === action.payload._id ? action.payload : purchase;
      });
    },
    updatePurchaseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePurchaseStart: (state) => {
      state.loading = true;
    },
    deletePurchaseSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.purchaseData = state.purchaseData.filter(
        (purchase) => purchase._id !== action.payload._id
      );
    },
    deletePurchaseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getPurchaseStart,
  getPurchaseSuccess,
  getPurchaseFailure,
  addPurchaseStart,
  addPurchaseSuccess,
  addPurchaseFailure,
  updatePurchaseStart,
  updatePurchaseSuccess,
  updatePurchaseFailure,
  deletePurchaseStart,
  deletePurchaseSuccess,
  deletePurchaseFailure,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
