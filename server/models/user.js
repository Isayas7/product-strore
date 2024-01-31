import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    role: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", usersSchema);
export default User;
