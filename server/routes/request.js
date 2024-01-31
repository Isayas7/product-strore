import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
} from "../controllers/request.js";
const router = express.Router();

//CREATE STORE
router.post("/create", createRequest);

//UPDATE
router.put("/:id", updateRequest);

//DELETE
router.delete("/:id", verifyAdmin, deleteRequest);

//GET USER
router.get("/:id", getRequest);

//GET USERS
router.get("/", getRequests);

export default router;
