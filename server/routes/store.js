import express from "express";
import {
  deleteStore,
  updateStore,
  getStore,
  getStores,
  createStore,
} from "../controllers/store.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE STORE
router.post("/create", verifyAdmin, createStore);

//UPDATE
router.put("/:id", verifyAdmin, updateStore);

//DELETE
router.delete("/:id", verifyAdmin, deleteStore);

//GET USER
router.get("/:id", getStore);

//GET USERS
router.get("/", getStores);

export default router;
