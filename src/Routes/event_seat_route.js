import express from "express";
import {
  assignSeatsToEventController,
  getEventSeatsController,
  updateEventSeatController,
  deleteEventSeatController,
} from "../Controllers/event_seat_controller.js";

const router = express.Router();

router.post("/:eventId/seats", assignSeatsToEventController);
router.get("/:eventId/seats", getEventSeatsController);

router.put("/:eventId/seats/:seatTypeId", updateEventSeatController);
router.delete("/:eventId/seats/:seatTypeId", deleteEventSeatController);

export default router;
