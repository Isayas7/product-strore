import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import layoutReducer from "./layoutSlice";
import storeReducer from "./storeSlice";
import userReducer from "./userSlice";
import commanReducer from "./commanSlice";
import categoryReducer from "./categorySlice";
import ProductReducer from "./productSlice";
import sellReducer from "./sellSlice";
import purchaseReducer from "./purchaseSlice";
import transferReducer from "./transferSlice";

export default configureStore({
  reducer: {
    comman: commanReducer,
    auth: authSlice,
    layout: layoutReducer,
    user: userReducer,
    store: storeReducer,
    category: categoryReducer,
    product: ProductReducer,
    purchase: purchaseReducer,
    sell: sellReducer,
    transfer: transferReducer,
  },
});
