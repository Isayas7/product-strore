import express from "express";
import { verifyAdmin, verifyStoreManager } from "../utils/verifyToken.js";
import {
  createSell,
  deleteSell,
  getSell,
  getSells,
  updateSell,
} from "../controllers/sell.js";
const router = express.Router();

//CREATE STORE
router.post("/create", verifyStoreManager, createSell);

//UPDATE
router.put("/:id", verifyAdmin, updateSell);

//DELETE
router.delete("/:id", verifyAdmin, deleteSell);

//GET USER
router.get("/:id", getSell);

//GET USERS
router.get("/", getSells);

export default router;
