import express from "express";
import InviterEventController from "../Controllers/event_inviter_controller.js";

const router = express.Router();

// Assign inviter to event
router.post("/assign", InviterEventController.addInviterToEvent);

// Remove inviter from event
router.delete("/remove", InviterEventController.removeInviterFromEvent);

// Get inviters of event
router.get(
  "/get-inviters-by-event/:eventId",
  InviterEventController.getInvitersByEvent
);

// Get events assigned to inviter
router.get(
  "/get-events-by-inviter/:inviterId",
  InviterEventController.getEventsByInviter
);

export default router;
