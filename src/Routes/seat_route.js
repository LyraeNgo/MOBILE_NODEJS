import express from "express";
import {
  createSeatTypeController,
  deleteSeatTypeController,
  getAllSeatTypes,
  getSeatTypeByIdController,
  updateSeatTypeController,
} from "../Controllers/seat_controller.js";

const router = express.Router();

router.get("/", getAllSeatTypes);
router.get("/:seatId", getSeatTypeByIdController);
router.post("/", createSeatTypeController);
router.put("/:seatId", updateSeatTypeController);
router.delete("/:seatId", deleteSeatTypeController);

export default router;
