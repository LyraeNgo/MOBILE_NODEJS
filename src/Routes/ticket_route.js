import express from "express";
import {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController,
  getUserTicketsController,
  updateTicketController,
  deleteTicketController,
} from "../Controllers/ticket_controller.js";

const router = express.Router();

router.post("/", createTicketController);
router.get("/", getAllTicketsController);
router.get("/:ticketId", getTicketByIdController);
router.get("/user/:userId", getUserTicketsController);
router.put("/:ticketId", updateTicketController);
router.delete("/:ticketId", deleteTicketController);

export default router;
