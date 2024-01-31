import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authentication.js";
import userRoute from "./routes/user.js";
import storeRoute from "./routes/store.js";
import categoryRoute from "./routes/category.js";
import ProductRoute from "./routes/product.js";
import sellRoute from "./routes/sell.js";
import purchaseRoute from "./routes/purchase.js";
import notificationRoute from "./routes/notification.js";
import requestRoute from "./routes/request.js";

dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("diconnected", () => {
  console.log("mongoDb disconnected ");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDb connected");
});

//MIDDLEWARE
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/store", storeRoute);
app.use("/category", categoryRoute);
app.use("/product", ProductRoute);
app.use("/sell", sellRoute);
app.use("/purchase", purchaseRoute);
app.use("/notification", notificationRoute);
app.use("/request", requestRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("connected to backend");
});
