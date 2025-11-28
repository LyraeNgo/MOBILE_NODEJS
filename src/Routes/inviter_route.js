import express from "express";
import {
  getInvitersController,
  getInviterByIdController,
  createInviterController,
  updateInviterController,
  deleteInviterController,
} from "../Controllers/inviter_controller.js";

const router = express.Router();

router.get("/", getInvitersController);
router.get("/:id", getInviterByIdController);
router.post("/", createInviterController);
router.put("/:id", updateInviterController);
router.delete("/:id", deleteInviterController);

export default router;
