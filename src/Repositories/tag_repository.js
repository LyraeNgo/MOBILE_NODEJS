// repositories/TagsRepository.js
import pool from "../../config/db.js";
import Tag from "../Models/tag_models.js";

export default class TagsRepository {
  /** Find all tags */
  static async findAll() {
    const result = await pool.query(`
      SELECT tag_id, name, created_at, updated_at
      FROM event_tags
    `);
    return result.rows.map((row) => new Tag(row));
  }

  /** Find tag by ID */
  static async findById(tagId) {
    const result = await pool.query(
      `
      SELECT tag_id, name, created_at, updated_at
      FROM event_tags
      WHERE tag_id = $1
    `,
      [tagId]
    );

    if (!result.rows[0]) return null;
    return new Tag(result.rows[0]);
  }

  /** Find tag by name */
  static async findByName(name) {
    const result = await pool.query(
      `
      SELECT tag_id, name, created_at, updated_at
      FROM event_tags
      WHERE name = $1
    `,
      [name]
    );

    if (!result.rows[0]) return null;
    return new Tag(result.rows[0]);
  }

  /** Create a new tag */
  static async create({ name }) {
    const result = await pool.query(
      `
      INSERT INTO event_tags (name)
      VALUES ($1)
      RETURNING tag_id, name, created_at, updated_at
    `,
      [name]
    );

    return new Tag(result.rows[0]);
  }

  /** Update tag */
  static async update(tagId, { name }) {
    const result = await pool.query(
      `
      UPDATE event_tags
      SET name = COALESCE($1, name),
          updated_at = NOW()
      WHERE tag_id = $2
      RETURNING tag_id, name, created_at, updated_at
    `,
      [name, tagId]
    );

    if (!result.rows[0]) return null;
    return new Tag(result.rows[0]);
  }

  /** Delete tag */
  static async delete(tagId) {
    const result = await pool.query(
      `
      DELETE FROM event_tags
      WHERE tag_id = $1
      RETURNING tag_id, name
    `,
      [tagId]
    );

    if (!result.rows[0]) return null;
    return result.rows[0];
  }
}
