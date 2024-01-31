import axios from "axios";
import {
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
} from "../redux/userSlice";

export const getUser = async (middleWare, dispatch) => {
  dispatch(getUserStart());
  try {
    const response = await axios.get("/user");

    if (response.status === 200) dispatch(getUserSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getUserFailure(error));
  }
};

export const AddNewUser = async (newUser, dispatch) => {
  dispatch(addUserStart());
  try {
    const response = await axios.post("/auth/register", newUser);
    if (response.status === 200) dispatch(addUserSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(addUserFailure(error));
  }
};

export const updateUser = async (editedRow, dispatch) => {
  dispatch(updateUserStart());
  try {
    const response = await axios.put(`/user/${editedRow._id}`, editedRow);
    if (response.status === 200) dispatch(updateUserSuccess(response.data));
    else {
      throw new Error("Failed to update a user");
    }
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

export const deleteUser = async (rowToDelete, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const response = await axios.delete(`/user/${rowToDelete}`);
    if (response.status === 200) dispatch(deleteUserSuccess(response.data));
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};
