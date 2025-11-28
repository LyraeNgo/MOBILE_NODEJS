// routes/auth_router.js
import express from "express";
import {
  loginController,
  registerController,
} from "../Controllers/auth_controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
