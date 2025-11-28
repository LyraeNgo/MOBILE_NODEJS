// routes/events_router.js
import express from "express";
import {
  getAllEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
  getEventByDateController,
} from "../Controllers/event_controller.js";

const router = express.Router();

// TODO FIX FIND  BY DATE

router.get("/", getAllEventsController);
router.get("/:eventId", getEventByIdController);
router.get("/date/:date", getEventByDateController);
router.post("/", createEventController);
router.put("/:eventId", updateEventController);
router.delete("/:eventId", deleteEventController);

export default router;
