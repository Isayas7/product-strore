import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createNotification,
  deleteNotification,
  getNotification,
  getNotifications,
  updateNotification,
} from "../controllers/notification.js";
const router = express.Router();

//CREATE STORE
router.post("/create", createNotification);

//UPDATE
router.put("/:id", updateNotification);

//DELETE
router.delete("/:id", verifyAdmin, deleteNotification);

//GET USER
router.get("/:id", getNotification);

//GET USERS
router.get("/", getNotifications);

export default router;
