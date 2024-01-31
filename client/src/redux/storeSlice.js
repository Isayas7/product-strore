import { createSlice } from "@reduxjs/toolkit";
export const storeSlice = createSlice({
  name: "store",
  initialState: {
    storeData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getStoreStart: (state) => {
      state.loading = true;
    },
    getStoreSuccess: (state, action) => {
      state.loading = false;
      state.storeData = action.payload;
    },
    getStoreFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addStoreStart: (state) => {
      state.loading = true;
    },
    addStoreSuccess: (state, action) => {
      state.loading = false;
      state.storeData.push(action.payload);
    },
    addStoreFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStoreStart: (state) => {
      state.loading = true;
    },
    updateStoreSuccess: (state, action) => {
      state.loading = false;
      state.storeData = state.storeData.map((store) => {
        return store._id === action.payload._id ? action.payload : store;
      });
    },
    updateStoreFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStoreStart: (state) => {
      state.loading = true;
    },
    deleteStoreSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.storeData = state.storeData.filter(
        (store) => store._id !== action.payload._id
      );
    },
    deleteStoreFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getStoreStart,
  getStoreSuccess,
  getStoreFailure,
  addStoreStart,
  addStoreSuccess,
  addStoreFailure,
  updateStoreStart,
  updateStoreSuccess,
  updateStoreFailure,
  deleteStoreStart,
  deleteStoreSuccess,
  deleteStoreFailure,
} = storeSlice.actions;
export default storeSlice.reducer;
