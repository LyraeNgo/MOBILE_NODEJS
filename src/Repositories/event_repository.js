// repositories/EventRepository.js
import pool from "../../config/db.js";
import { Event } from "../Models/event_models.js";

export default class EventRepository {
  /** Find all events */
  static async findAll() {
    const result = await pool.query(`
      SELECT *
      FROM events
    `);
    console.log("🚀 ~ EventRepository ~ findAll ~ result:", result);

    return result.rows.map((row) => new Event(row));
  }

  /** Find event by ID */
  static async findById(eventId) {
    const result = await pool.query(
      `SELECT * FROM events WHERE "event_id" = $1`,
      [eventId]
    );
    if (!result.rows[0]) return null;
    return new Event(result.rows[0]);
  }

  /** Create event */
  static async create({
    organizerId,
    title,
    description,
    place,
    date,
    time,
    price = 0,
    status = "active",
  }) {
    const result = await pool.query(
      `INSERT INTO events ("organizer_id", "title", "description", "place", "date", "time", "price", "status")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [organizerId, title, description, place, date, time, price, status]
    );
    return new Event(result.rows[0]);
  }

  /** Update event */
  static async update(
    eventId,
    { title, description, place, date, time, price, status }
  ) {
    const result = await pool.query(
      `UPDATE events
       SET 
         "title" = COALESCE($1, "title"),
         "description" = COALESCE($2, "description"),
         "place" = COALESCE($3, "place"),
         "date" = COALESCE($4, "date"),
         "time" = COALESCE($5, "time"),
         "price" = COALESCE($6, "price"),
         "status" = COALESCE($7, "status"),
         "updated_at" = NOW()
       WHERE "event_id" = $8
       RETURNING *`,
      [title, description, place, date, time, price, status, eventId]
    );
    if (!result.rows[0]) return null;
    return new Event(result.rows[0]);
  }

  /** Delete event */
  static async delete(eventId) {
    const result = await pool.query(
      `DELETE FROM events WHERE "event_id" = $1 RETURNING *`,
      [eventId]
    );
    if (!result.rows[0]) return null;
    return new Event(result.rows[0]);
  }

  // find by date
  static async findByDate(date) {
    const result = await pool.query(`SELECT * FROM events WHERE "date" = $1`, [
      date,
    ]);
    if (!result.rows[0]) return null;
  }
}
