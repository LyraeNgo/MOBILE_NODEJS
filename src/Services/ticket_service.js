import {
  createTicketRepo,
  getAllTicketsRepo,
  getTicketByIdRepo,
  getTicketsByUserRepo,
  updateTicketRepo,
  deleteTicketRepo,
} from "../Repositories/ticket_repository.js";

export const serviceCreateTicket = async (data) => {
  return await createTicketRepo(
    data.eventId,
    data.userId,
    data.ticketType,
    data.price,
    data.quantity
  );
};

export const serviceGetAllTickets = async () => {
  return await getAllTicketsRepo();
};

export const serviceGetTicketById = async (ticketId) => {
  return await getTicketByIdRepo(ticketId);
};

export const serviceGetTicketsByUser = async (userId) => {
  return await getTicketsByUserRepo(userId);
};

export const serviceUpdateTicket = async (ticketId, data) => {
  return await updateTicketRepo(ticketId, data);
};

export const serviceDeleteTicket = async (ticketId) => {
  return await deleteTicketRepo(ticketId);
};
