import mongoose from "mongoose";
const storeSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeLocation: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("store", storeSchema);
export default Store;
