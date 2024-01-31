import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
const router = express.Router();

//CREATE STORE
router.post("/create", verifyAdmin, createCategory);

//UPDATE
router.put("/:id", verifyAdmin, updateCategory);

//DELETE
router.delete("/:id", verifyAdmin, deleteCategory);

//GET USER
router.get("/:id", getCategory);

//GET USERS
router.get("/", getCategories);

export default router;
