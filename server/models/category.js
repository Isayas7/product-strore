import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    typeName: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);
export default Category;
