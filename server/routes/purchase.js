import express from "express";
import { verifyAdmin, verifyStoreManager } from "../utils/verifyToken.js";
import {
  createPurchase,
  deletePurchase,
  getPurchase,
  getPurchases,
  updatePurchase,
} from "../controllers/purchase.js";
const router = express.Router();

//CREATE STORE
router.post("/create", verifyStoreManager, createPurchase);

//UPDATE
router.put("/:id", verifyAdmin, updatePurchase);

//DELETE
router.delete("/:id", verifyAdmin, deletePurchase);

//GET USER
router.get("/:id", getPurchase);

//GET USERS
router.get("/", getPurchases);

export default router;
