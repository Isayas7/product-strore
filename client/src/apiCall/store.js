import axios from "axios";
import {
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
} from "../redux/storeSlice";

export const getStore = async (middleWare, dispatch) => {
  dispatch(getStoreStart());
  try {
    const response = await axios.get("/store");
    if (response.status === 200) dispatch(getStoreSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getStoreFailure(error));
  }
};

export const addNewStore = async (newStore, dispatch) => {
  dispatch(addStoreStart());
  try {
    const response = await axios.post("/store/create", newStore);
    if (response.status === 200) dispatch(addStoreSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addStoreFailure(error));
  }
};

export const updateStore = async (editedRow, dispatch) => {
  dispatch(updateStoreStart());
  try {
    const response = await axios.put(`/store/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateStoreSuccess(response.data));
    else {
      throw new Error("Failed to update a Store");
    }
  } catch (error) {
    dispatch(updateStoreFailure(error));
  }
};

export const deleteStore = async (rowToDelete, dispatch) => {
  dispatch(deleteStoreStart());
  try {
    const response = await axios.delete(`/store/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteStoreSuccess(response.data));
  } catch (error) {
    dispatch(deleteStoreFailure(error));
  }
};
