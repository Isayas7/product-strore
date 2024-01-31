import axios from "axios";
import {
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
} from "../redux/sellSlice";

export const getSell = async (middleWare, dispatch) => {
  dispatch(getSellStart());
  try {
    const response = await axios.get("/sell");
    if (response.status === 200) dispatch(getSellSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getSellFailure(error));
  }
};

export const addNewSell = async (newSell, dispatch) => {
  dispatch(addSellStart());
  try {
    const response = await axios.post("/sell/create", newSell);
    if (response.status === 200) dispatch(addSellSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addSellFailure(error));
  }
};

export const updateSell = async (editedRow, dispatch) => {
  dispatch(updateSellStart());
  try {
    const response = await axios.put(`/sell/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateSellSuccess(response.data));
    else {
      throw new Error("Failed to update a Sell");
    }
  } catch (error) {
    dispatch(updateSellFailure(error));
  }
};

export const deleteSell = async (rowToDelete, dispatch) => {
  dispatch(deleteSellStart());
  try {
    const response = await axios.delete(`/sell/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteSellSuccess(response.data));
  } catch (error) {
    dispatch(deleteSellFailure(error));
  }
};
