import { createSlice } from "@reduxjs/toolkit";
export const commanSlice = createSlice({
  name: "comman",
  initialState: {
    data: {},
    loading: false,
    error: null,
    openModal: false,
    openViewModal: false,
    openDialog: false,
    formValues: {},
    rowToEdit: null,
    rowToDlete: null,
    viewId: "",
  },
  reducers: {
    getDataStart: (state) => {
      state.loading = true;
    },
    getDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    setRowToEdit: (state, action) => {
      state.rowToEdit = action.payload;
    },

    setRowToDelete: (state, action) => {
      state.rowToDlete = action.payload;
    },
    setOpenModal: (state) => {
      state.openModal = !state.openModal;
      if (state.openModal === false) {
        state.rowToEdit = null;
        state.formValues = {};
      }
    },
    setOpenViewModal: (state) => {
      state.openViewModal = !state.openViewModal;
      if (state.openViewModal === false) {
        state.viewId = "";
        state.rowToEdit = null;
      }
    },
    setOpenDialog: (state) => {
      state.openDialog = !state.openDialog;
      if (state.openDialog === false) {
        state.rowToDlete = null;
      }
    },
    setViewId: (state, action) => {
      state.viewId = action.payload;
    },
  },
});
export const {
  setFormValues,
  setRowToEdit,
  setRowToDelete,
  setOpenModal,
  setOpenDialog,
  setViewId,
  setOpenViewModal,
  getDataStart,
  getDataSuccess,
  getDataFailure,
} = commanSlice.actions;
export default commanSlice.reducer;
