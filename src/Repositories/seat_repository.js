import pool from "../../config/db.js";
import SeatType from "../Models/seat_models.js";

export default class SeatTypeRepository {
  static async findAll() {

    const query = `
      SELECT seat_type_id, seat_name, created_at, updated_at
      FROM seat_types
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows.map(
      (row) =>
        new SeatType({
          seatTypeId: row.seat_type_id,
          seatName: row.seat_name,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
    );
  }

  static async findById(id) {
    const query = `
      SELECT seat_type_id, seat_name, created_at, updated_at
      FROM seat_types
      WHERE seat_type_id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return new SeatType({
      seatTypeId: row.seat_type_id,
      seatName: row.seat_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static async create(seatName) {
    const query = `
      INSERT INTO seat_types (seat_name)
      VALUES ($1)
      RETURNING seat_type_id, seat_name, created_at, updated_at
    `;
    const { rows } = await pool.query(query, [seatName]);

    const row = rows[0];
    return new SeatType({
      seatTypeId: row.seat_type_id,
      seatName: row.seat_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static async update(id, seatName) {
    const query = `
      UPDATE seat_types
      SET seat_name = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE seat_type_id = $2
      RETURNING seat_type_id, seat_name, created_at, updated_at
    `;
    const { rows } = await pool.query(query, [seatName, id]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return new SeatType({
      seatTypeId: row.seat_type_id,
      seatName: row.seat_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  static async delete(id) {
    const query = `DELETE FROM seat_types WHERE seat_type_id = $1`;
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }
}
