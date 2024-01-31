import { createSlice } from "@reduxjs/toolkit";
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
  },
  reducers: {
    getCategoryStart: (state) => {
      state.loading = true;
    },
    getCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },
    getCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCategoryStart: (state) => {
      state.loading = true;
    },
    addCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData.push(action.payload);
    },
    addCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCategoryStart: (state) => {
      state.loading = true;
    },
    updateCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = state.categoryData.map((category) => {
        return category._id === action.payload._id ? action.payload : category;
      });
    },
    updateCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryStart: (state) => {
      state.loading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categoryData = state.categoryData.filter(
        (category) => category._id !== action.payload._id
      );
    },
    deleteCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;
export default categorySlice.reducer;
