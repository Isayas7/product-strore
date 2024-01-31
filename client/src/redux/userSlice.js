import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loading: false,
    error: null,
    // openModal: false,
    // openDialog: false,
    // formValues: {},
    // rowToEdit: null,
    // rowToDlete: null,
  },
  reducers: {
    getUserStart: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserStart: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.userData.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = state.userData.map((user) => {
        return user._id === action.payload._id ? action.payload : user;
      });
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = state.userData.filter(
        (user) => user._id !== action.payload._id
      );
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // setFormValues: (state, action) => {
    //   state.formValues = action.payload;
    // },
    // setRowToEdit: (state, action) => {
    //   state.rowToEdit = action.payload;
    // },

    // setRowToDelete: (state, action) => {
    //   state.rowToDlete = action.payload;
    // },
    // setOpenModal: (state) => {
    //   state.openModal = !state.openModal;
    //   if (state.openModal === false) {
    //     state.rowToEdit = null;
    //     state.formValues = {};
    //   }
    // },
    // setOpenDialog: (state) => {
    //   state.openDialog = !state.openDialog;
    // },
  },
});
export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  // setFormValues,
  // setRowToEdit,
  // setRowToDelete,
  // setOpenModal,
  // setOpenDialog,
} = userSlice.actions;
export default userSlice.reducer;
