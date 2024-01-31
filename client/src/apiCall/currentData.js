import axios from "axios";
import {
  getDataStart,
  getDataSuccess,
  getDataFailure,
} from "../redux/commanSlice";
export const getData = async (viewId, dispatch) => {
  dispatch(getDataStart());
  try {
    const response = await axios.get(viewId);
    if (response.status === 200) dispatch(getDataSuccess(response.data));
    else {
      throw new Error("Failed to add row");
    }
  } catch (error) {
    dispatch(getDataFailure(error));
  }
};
