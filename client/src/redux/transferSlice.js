import { createSlice } from "@reduxjs/toolkit";
export const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    transferData: [],
    dataFrom: [],
    dataTo: [],
    loading: false,
    error: null,
  },
  reducers: {
    getDataFromStart: (state) => {
      state.loading = true;
    },
    getDataFromSuccess: (state, action) => {
      state.loading = false;
      state.dataFrom = action.payload;
    },
    getDataFromFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDataFromStart: (state) => {
      state.loading = true;
    },
    updateDataFromSuccess: (state, action) => {
      state.loading = false;
      state.dataFrom = state.dataFrom.map((data_from) => {
        return data_from._id === action.payload._id
          ? action.payload
          : data_from;
      });
    },
    updateDataFromFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDataToStart: (state) => {
      state.loading = true;
    },
    getDataToSuccess: (state, action) => {
      state.loading = false;
      state.dataTo = action.payload;
    },
    getDataToFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addDataToStart: (state) => {
      state.loading = true;
    },
    addDataToSuccess: (state, action) => {
      state.loading = false;
      state.dataTo.push(action.payload);
    },
    addDataToFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDataToStart: (state) => {
      state.loading = true;
    },
    updateDataToSuccess: (state, action) => {
      state.loading = false;
      state.dataTo = state.dataTo.map((data_to) => {
        return data_to._id === action.payload._id ? action.payload : data_to;
      });
    },
    updateDataToFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTransferStart: (state) => {
      state.loading = true;
    },
    getTransferSuccess: (state, action) => {
      state.loading = false;
      state.transferData = action.payload;
    },
    getTransferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTransferStart: (state) => {
      state.loading = true;
    },
    addTransferSuccess: (state, action) => {
      state.loading = false;
      state.transferData.push(action.payload);
    },
    addTransferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTransferStart: (state) => {
      state.loading = true;
    },
    updateTransferSuccess: (state, action) => {
      state.loading = false;
      state.transferData = state.transferData.map((transfer) => {
        return transfer._id === action.payload._id ? action.payload : transfer;
      });
    },
    updateTransferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTransferStart: (state) => {
      state.loading = true;
    },
    deleteTransferSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.transferData = state.transferData.filter(
        (transfer) => transfer._id !== action.payload._id
      );
    },
    deleteTransferFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getTransferStart,
  getTransferSuccess,
  getTransferFailure,
  addTransferStart,
  addTransferSuccess,
  addTransferFailure,
  updateTransferStart,
  updateTransferSuccess,
  updateTransferFailure,
  deleteTransferStart,
  deleteTransferSuccess,
  deleteTransferFailure,
  getDataFromStart,
  getDataFromSuccess,
  getDataFromFailure,
  updateDataFromStart,
  updateDataFromSuccess,
  updateDataFromFailure,
  getDataToStart,
  getDataToSuccess,
  getDataToFailure,
  addDataToStart,
  addDataToSuccess,
  addDataToFailure,
  updateDataToStart,
  updateDataToSuccess,
  updateDataToFailure,
} = transferSlice.actions;
export default transferSlice.reducer;
