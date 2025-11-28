import pool from "../../config/db.js";
import Inviter from "../Models/inviter_models.js";

export default class InvitersRepository {
  /** Get all inviters */
  static async findAll() {
    const result = await pool.query(`
      SELECT inviter_id, full_name, email, follower, role_id, image, created_at, updated_at
      FROM inviters
    `);
    return result.rows.map(
      (row) =>  
        new Inviter({
          inviterId: row.inviter_id,
          fullName: row.full_name,
          email: row.email,
          follower: row.follower,
          roleId: row.role_id,
          image: row.image,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
    );
  }

  /** Find inviter by ID */
  static async findById(inviterId) {
    const result = await pool.query(
      `SELECT inviter_id, full_name, email, follower, role_id, image, created_at, updated_at
       FROM inviters WHERE inviter_id = $1`,
      [inviterId]
    );
    if (!result.rows[0]) return null;
    const row = result.rows[0];
    return new Inviter({
      inviterId: row.inviter_id,
      fullName: row.full_name,
      email: row.email,
      follower: row.follower,
      roleId: row.role_id,
      image: row.image,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Create new inviter */
  static async create({ fullName, email, follower = 0, roleId, image }) {
    const result = await pool.query(
      `INSERT INTO inviters (full_name, email, follower, role_id, image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING inviter_id, full_name, email, follower, role_id, image, created_at, updated_at`,
      [fullName, email, follower, roleId, image]
    );
    const row = result.rows[0];
    return new Inviter({
      inviterId: row.inviter_id,
      fullName: row.full_name,
      email: row.email,
      follower: row.follower,
      roleId: row.role_id,
      image: row.image,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Update inviter */
  static async update(inviterId, { fullName, email, follower, roleId, image }) {
    const result = await pool.query(
      `UPDATE inviters
       SET full_name = COALESCE($1, full_name),
           email = COALESCE($2, email),
           follower = COALESCE($3, follower),
           role_id = COALESCE($4, role_id),
           image = COALESCE($5, image),
           updated_at = NOW()
       WHERE inviter_id = $6
       RETURNING inviter_id, full_name, email, follower, role_id, image, created_at, updated_at`,
      [fullName, email, follower, roleId, image, inviterId]
    );
    if (!result.rows[0]) return null;
    const row = result.rows[0];
    return new Inviter({
      inviterId: row.inviter_id,
      fullName: row.full_name,
      email: row.email,
      follower: row.follower,
      roleId: row.role_id,
      image: row.image,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Delete inviter */
  static async delete(inviterId) {
    const result = await pool.query(
      `DELETE FROM inviters
       WHERE inviter_id = $1
       RETURNING inviter_id, full_name, email`,
      [inviterId]
    );
    if (!result.rows[0]) return null;
    const row = result.rows[0];
    return {
      inviterId: row.inviter_id,
      fullName: row.full_name,
      email: row.email,
    };
  }
}
