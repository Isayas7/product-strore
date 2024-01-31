import axios from "axios";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from "../redux/productSlice";

export const getProduct = async (viewId, dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await axios.get(`/product/${viewId}`);
    if (response.status === 200) dispatch(getProductSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getProductFailure(error));
  }
};

export const addNewProduct = async (newProduct, dispatch) => {
  dispatch(addProductStart());
  try {
    const response = await axios.post("/product/create", newProduct);
    if (response.status === 200) dispatch(addProductSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addProductFailure(error));
  }
};

export const updateProduct = async (editedRow, dispatch) => {
  dispatch(updateProductStart());
  try {
    const response = await axios.put(`/product/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateProductSuccess(response.data));
    else {
      throw new Error("Failed to update a Product");
    }
  } catch (error) {
    dispatch(updateProductFailure(error));
  }
};

export const deleteProduct = async (rowToDelete, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const response = await axios.delete(`/product/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteProductSuccess(response.data));
  } catch (error) {
    dispatch(deleteProductFailure(error));
  }
};
