import { createSlice } from "@reduxjs/toolkit";
export const sellSlice = createSlice({
  name: "sell",
  initialState: {
    sellData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getSellStart: (state) => {
      state.loading = true;
    },
    getSellSuccess: (state, action) => {
      state.loading = false;
      state.sellData = action.payload;
    },
    getSellFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSellStart: (state) => {
      state.loading = true;
    },
    addSellSuccess: (state, action) => {
      state.loading = false;
      state.sellData.push(action.payload);
    },
    addSellFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSellStart: (state) => {
      state.loading = true;
    },
    updateSellSuccess: (state, action) => {
      state.loading = false;
      state.sellData = state.sellData.map((sell) => {
        return sell._id === action.payload._id ? action.payload : sell;
      });
    },
    updateSellFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSellStart: (state) => {
      state.loading = true;
    },
    deleteSellSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.sellData = state.sellData.filter(
        (sell) => sell._id !== action.payload._id
      );
    },
    deleteSellFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getSellStart,
  getSellSuccess,
  getSellFailure,
  addSellStart,
  addSellSuccess,
  addSellFailure,
  updateSellStart,
  updateSellSuccess,
  updateSellFailure,
  deleteSellStart,
  deleteSellSuccess,
  deleteSellFailure,
} = sellSlice.actions;
export default sellSlice.reducer;
