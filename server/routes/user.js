import express  from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router =  express.Router();


//UPDATE
router.put("/:id", verifyAdmin,  updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET USER
router.get("/:id",  getUser)

//GET USERS
router.get("/",  getUsers)

export default router;