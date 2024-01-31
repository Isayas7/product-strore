import express from "express";
import { login, register } from "../controllers/authentication.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//REGISTER USER
router.post("/register", register);

//LOGIN USER
router.post("/login", login);

export default router;
