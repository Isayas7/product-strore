import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    link: {
      type: mongoose.Schema.Types.ObjectId,
    },
    role: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
