import express from "express";
import {
  verifyAdmin,
  verifyStoreManager,
  verifyUser,
} from "../utils/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
const router = express.Router();

//CREATE PRODUCT
router.post("/create", verifyUser, createProduct);

//UPDATE
router.put("/:id", verifyUser, updateProduct);

//DELETE
router.delete("/:id", verifyStoreManager, deleteProduct);

//GET USER
router.get("/:id", getProduct);

//GET USERS
router.get("/", getProducts);

export default router;
