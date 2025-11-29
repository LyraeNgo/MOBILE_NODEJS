import pool from "../../config/db.js";
import InviterEvent from "../Models/event_inviter_models.js";

export default class EventInviterRepo {
  /** Assign inviter to event */
  static async addInviterToEvent({ inviterId, eventId }) {
    const query = `
      INSERT INTO inviters_events (inviter_id, event_id)
      VALUES ($1, $2)
      RETURNING inviter_id, event_id, created_at
    `;
    const result = await pool.query(query, [inviterId, eventId]);
    const row = result.rows[0];

    return new InviterEvent({
      inviterId: row.inviter_id,
      eventId: row.event_id,
      createdAt: row.created_at,
    });
  }

  /** Remove inviter from event */
  static async removeInviterFromEvent({ inviterId, eventId }) {
    const query = `
      DELETE FROM inviters_events
      WHERE inviter_id = $1 AND event_id = $2
      RETURNING inviter_id, event_id, created_at
    `;
    const result = await pool.query(query, [inviterId, eventId]);
    const row = result.rows[0];
    if (!row) return null;

    return new InviterEvent({
      inviterId: row.inviter_id,
      eventId: row.event_id,
      createdAt: row.created_at,
    });
  }

  /** Get all inviters assigned to an event */
  static async getInvitersByEvent(eventId) {
    const query = `
      SELECT 
        ie.inviter_id,
        ie.event_id,
        ie.created_at,

        i.full_name,
        i.email,
        i.follower,
        i.role_id,
        i.image,

        e.title AS event_title,
        e.date AS event_date,
        e.place AS event_place

      FROM inviters_events ie
      JOIN inviters i ON ie.inviter_id = i.inviter_id
      JOIN events e ON ie.event_id = e.event_id
      WHERE ie.event_id = $1
      ORDER BY ie.created_at ASC
    `;
    const result = await pool.query(query, [eventId]);

    return result.rows.map(
      (row) =>
        new InviterEvent({
          inviterId: row.inviter_id,
          eventId: row.event_id,

          fullName: row.full_name,
          email: row.email,
          follower: row.follower,
          roleId: row.role_id,
          image: row.image,

          eventTitle: row.event_title,
          eventDate: row.event_date,
          eventPlace: row.event_place,

          createdAt: row.created_at,
        })
    );
  }

  /** Get all events assigned to inviter */
  static async getEventsByInviter(inviterId) {
    const query = `
      SELECT 
        ie.inviter_id,
        ie.event_id,
        ie.created_at,

        i.full_name,
        i.email,
        i.follower,
        i.role_id,
        i.image,

        e.title AS event_title,
        e.date AS event_date,
        e.place AS event_place

      FROM inviters_events ie
      JOIN inviters i ON ie.inviter_id = i.inviter_id
      JOIN events e ON ie.event_id = e.event_id
      WHERE ie.inviter_id = $1
      ORDER BY ie.created_at DESC
    `;
    const result = await pool.query(query, [inviterId]);

    return result.rows.map(
      (row) =>
        new InviterEvent({
          inviterId: row.inviter_id,
          eventId: row.event_id,

          fullName: row.full_name,
          email: row.email,
          follower: row.follower,
          roleId: row.role_id,
          image: row.image,

          eventTitle: row.event_title,
          eventDate: row.event_date,
          eventPlace: row.event_place,

          createdAt: row.created_at,
        })
    );
  }
}
