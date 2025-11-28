import pool from "../../config/db.js";
import { Media } from "../Models/media_models.js";

export default class MediaRepository {
  /** Get all media */
  static async findAll() {
    const result = await pool.query(`
      SELECT 
        media_id,
        event_id,
        file_path,
        type,
        uploaded_at
      FROM media
      ORDER BY uploaded_at DESC
    `);

    return result.rows.map((row) => new Media(row));
  }

  /** Get media by ID */
  static async findById(mediaId) {
    const result = await pool.query(
      `
      SELECT 
        media_id,
        event_id,
        file_path,
        type,
        uploaded_at
      FROM media
      WHERE media_id = $1
      `,
      [mediaId]
    );

    if (!result.rows[0]) return null;
    return new Media(result.rows[0]);
  }

  /** Get media list by event_id */
  static async findByEventId(eventId) {
    const result = await pool.query(
      `
      SELECT 
        media_id,
        event_id,
        file_path,
        type,
        uploaded_at
      FROM media
      WHERE event_id = $1
      ORDER BY uploaded_at DESC
      `,
      [eventId]
    );

    return result.rows.map((row) => new Media(row));
  }

  /** Search media by type */
  static async search(typeQuery) {
    const result = await pool.query(
      `
      SELECT 
        media_id,
        event_id,
        file_path,
        type,
        uploaded_at
      FROM media
      WHERE type ILIKE $1
      `,
      [`%${typeQuery}%`]
    );

    return result.rows.map((row) => new Media(row));
  }

  /** Update media */
  static async update(mediaId, { filePath, type }) {
    const result = await pool.query(
      `
      UPDATE media
      SET 
        file_path = COALESCE($1, file_path),
        type = COALESCE($2, type)
      WHERE media_id = $3
      RETURNING media_id, event_id, file_path, type, uploaded_at
      `,
      [filePath, type, mediaId]
    );

    if (!result.rows[0]) return null;

    return new Media(result.rows[0]);
  }

  /** Delete media */
  static async delete(mediaId) {
    const result = await pool.query(
      `
      DELETE FROM media
      WHERE media_id = $1
      RETURNING media_id, event_id
      `,
      [mediaId]
    );

    if (!result.rows[0]) return null;

    return {
      mediaId: result.rows[0].media_id,
      eventId: result.rows[0].event_id,
    };
  }
}
