import axios from "axios";
import {
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
} from "../redux/purchaseSlice";

export const getPurchase = async (middleWare, dispatch) => {
  dispatch(getPurchaseStart());
  try {
    const response = await axios.get("/purchase");
    if (response.status === 200) dispatch(getPurchaseSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getPurchaseFailure(error));
  }
};

export const addNewPurchase = async (newPurchase, dispatch) => {
  dispatch(addPurchaseStart());
  try {
    const response = await axios.post("/purchase/create", newPurchase);
    if (response.status === 200) dispatch(addPurchaseSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addPurchaseFailure(error));
  }
};

export const updatePurchase = async (editedRow, dispatch) => {
  dispatch(updatePurchaseStart());
  try {
    const response = await axios.put(`/purchase/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updatePurchaseSuccess(response.data));
    else {
      throw new Error("Failed to update a Purchase");
    }
  } catch (error) {
    dispatch(updatePurchaseFailure(error));
  }
};

export const deletePurchase = async (rowToDelete, dispatch) => {
  dispatch(deletePurchaseStart());
  try {
    const response = await axios.delete(`/purchase/${rowToDelete}`);
    if (response.status === 200) dispatch(deletePurchaseSuccess(response.data));
  } catch (error) {
    dispatch(deletePurchaseFailure(error));
  }
};
