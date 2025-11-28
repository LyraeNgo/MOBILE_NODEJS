import pool from "../../config/db.js";
import { Ticket } from "../Models/ticket_models.js";

// Create
export const createTicketRepo = async (
  eventId,
  userId,
  ticketType,
  price,
  quantity
) => {
  const query = `
      INSERT INTO tickets (event_id, user_id, ticket_type, price, quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    eventId,
    userId,
    ticketType,
    price,
    quantity,
  ]);

  return rows.length ? new Ticket(rows[0]) : null;
};

// Get all tickets
export const getAllTicketsRepo = async () => {
  const { rows } = await pool.query(`SELECT * FROM tickets`);
  return rows.map((r) => new Ticket(r));
};

// Get by ID
export const getTicketByIdRepo = async (ticketId) => {
  const { rows } = await pool.query(
    `SELECT * FROM tickets WHERE ticket_id = $1`,
    [ticketId]
  );
  return rows.length ? new Ticket(rows[0]) : null;
};

// Get tickets for user
export const getTicketsByUserRepo = async (userId) => {
  const { rows } = await pool.query(
    `SELECT * FROM tickets WHERE user_id = $1`,
    [userId]
  );
  return rows.map((r) => new Ticket(r));
};

// Update
export const updateTicketRepo = async (ticketId, data) => {
  const query = `
    UPDATE tickets
    SET ticket_type = $1,
        price = $2,
        quantity = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE ticket_id = $4
    RETURNING *;
  `;  

  const { rows } = await pool.query(query, [
    data.ticketType,
    data.price,
    data.quantity,
    ticketId,
  ]);

  return rows.length ? new Ticket(rows[0]) : null;
};

// Delete
export const deleteTicketRepo = async (ticketId) => {
  const { rows } = await pool.query(
    `DELETE FROM tickets WHERE ticket_id = $1 RETURNING *`,
    [ticketId]
  );
  return rows.length ? new Ticket(rows[0]) : null;
};
