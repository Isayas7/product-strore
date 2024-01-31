import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/authSlice";

export const handlelogin = async (form, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", form);
    if (res) {
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    }
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};
