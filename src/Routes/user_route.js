import express from "express";
import {
  getAllUsers,
  getUserByIdController,
  createUserController,
  searchUsersController,
  updateUserController,
  changePasswordController,
  changeStatusController,
} from "../Controllers/user_controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

router.get("/:userId", getUserByIdController);

router.post("/search", searchUsersController);

router.post("/", createUserController);

router.put("/", updateUserController);

router.put("/change-password", changePasswordController);
router.put("/change-status", changeStatusController);

// Export router đúng
export default router;
