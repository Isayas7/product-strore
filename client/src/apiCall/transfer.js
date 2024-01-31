import axios from "axios";
import {
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
} from "../redux/transferSlice";

export const getDataFrom = async (url, dispatch) => {
  dispatch(getDataFromStart());
  try {
    const response = await axios.get(url);
    if (response.status === 200) dispatch(getDataFromSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getDataFromFailure(error));
  }
};
export const updateDataFrom = async (editedRow, dispatch) => {
  dispatch(updateDataFromStart());
  try {
    const response = await axios.put(`/product/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateDataFromSuccess(response.data));
    else {
      throw new Error("Failed to update a Transfer");
    }
  } catch (error) {
    dispatch(updateDataFromFailure(error));
  }
};

export const getDataTo = async (url, dispatch) => {
  dispatch(getDataToStart());
  try {
    const response = await axios.get(url);
    if (response.status === 200) dispatch(getDataToSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getDataToFailure(error));
  }
};

export const addNewDataTo = async (newTransfer, dispatch) => {
  dispatch(addDataToStart());
  try {
    const response = await axios.post("/product/create", newTransfer);
    if (response.status === 200) dispatch(addDataToSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addDataToFailure(error));
  }
};

export const updateDataTo = async (editedRow, dispatch) => {
  dispatch(updateDataToStart());
  try {
    const response = await axios.put(`/product/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateDataToSuccess(response.data));
    else {
      throw new Error("Failed to update a Transfer");
    }
  } catch (error) {
    dispatch(updateDataToFailure(error));
  }
};

export const getTransfer = async (middleWare, dispatch) => {
  dispatch(getTransferStart());
  try {
    const response = await axios.get("/transfer");
    if (response.status === 200) dispatch(getTransferSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getTransferFailure(error));
  }
};

export const addNewTransfer = async (newTransfer, dispatch) => {
  dispatch(addTransferStart());
  try {
    const response = await axios.post("/transfer/create", newTransfer);
    if (response.status === 200) dispatch(addTransferSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addTransferFailure(error));
  }
};

export const updateTransfer = async (editedRow, dispatch) => {
  dispatch(updateTransferStart());
  try {
    const response = await axios.put(`/transfer/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateTransferSuccess(response.data));
    else {
      throw new Error("Failed to update a Transfer");
    }
  } catch (error) {
    dispatch(updateTransferFailure(error));
  }
};

export const deleteTransfer = async (rowToDelete, dispatch) => {
  dispatch(deleteTransferStart());
  try {
    const response = await axios.delete(`/transfer/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteTransferSuccess(response.data));
  } catch (error) {
    dispatch(deleteTransferFailure(error));
  }
};
