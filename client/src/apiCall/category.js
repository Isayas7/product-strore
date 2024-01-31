import axios from "axios";
import {
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
} from "../redux/categorySlice";

export const getCategory = async (middleWare, dispatch) => {
  dispatch(getCategoryStart());
  try {
    const response = await axios.get("/category");
    if (response.status === 200) dispatch(getCategorySuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getCategoryFailure(error));
  }
};

export const addNewCategory = async (newCategory, dispatch) => {
  dispatch(addCategoryStart());
  try {
    const response = await axios.post("/category/create", newCategory);
    if (response.status === 200) dispatch(addCategorySuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addCategoryFailure(error));
  }
};

export const updateCategory = async (editedRow, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const response = await axios.put(`/category/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateCategorySuccess(response.data));
    else {
      throw new Error("Failed to update a Category");
    }
  } catch (error) {
    dispatch(updateCategoryFailure(error));
  }
};

export const deleteCategory = async (rowToDelete, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    const response = await axios.delete(`/category/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteCategorySuccess(response.data));
  } catch (error) {
    dispatch(deleteCategoryFailure(error));
  }
};
