import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
      // required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      // required: true,
    },
    size: {
      type: String,
      // required: true,
    },
    color: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    amount: {
      type: Number,
      min: 0,
      // required: true,
    },
    selledTimes: {
      type: Number,
      min: 0,
      // required: true,
    },
    condition: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export default Product;
