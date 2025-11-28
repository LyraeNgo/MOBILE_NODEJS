import {
  serviceCreateTicket,
  serviceGetAllTickets,
  serviceGetTicketById,
  serviceGetTicketsByUser,
  serviceUpdateTicket,
  serviceDeleteTicket,
} from "../Services/ticket_service.js";

export const createTicketController = async (req, res) => {
  try {
    const ticket = await serviceCreateTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTicketsController = async (req, res) => {
  try {
    const tickets = await serviceGetAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTicketByIdController = async (req, res) => {
  try {
    const ticket = await serviceGetTicketById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserTicketsController = async (req, res) => {
  try {
    const tickets = await serviceGetTicketsByUser(req.params.userId);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTicketController = async (req, res) => {
  try {
    const updated = await serviceUpdateTicket(req.params.ticketId, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTicketController = async (req, res) => {
  try {
    const deleted = await serviceDeleteTicket(req.params.ticketId);
    res.json({ message: "Deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
