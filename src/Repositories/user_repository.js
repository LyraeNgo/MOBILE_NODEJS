// repositories/UsersRepository.js
import pool from "../../config/db.js";
import User from "../Models/user_models.js";
import bcrypt from "bcryptjs";

export default class UsersRepository {
  /** Find all users */
  static async findAll() {
    const result = await pool.query(`
      SELECT 
        user_id,
        full_name,
        email,
        role,
        created_at,
        updated_at
      FROM users
    `); 

    return result.rows.map(
      (row) =>
        new User({
          userId: row.user_id,
          full_name: row.full_name,
          email: row.email,
          password: undefined,
          role: row.role,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
    );
  }

  /** Find user by ID */
  static async findById(userId) {
    const result = await pool.query(
      `
      SELECT 
        user_id,
        full_name,
        email,
        role,
        created_at,
        updated_at
      FROM users
      WHERE user_id = $1
      `,
      [userId]
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0];
    return new User({
      userId: row.user_id,
      fullname: row.full_name,
      email: row.email,
      password: undefined,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Find user by email */
  static async findByEmail(email) {
    const result = await pool.query(
      `
      SELECT 
        user_id,
        full_name,
        email,
        password,
        role,
        created_at,
        updated_at
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0];
    return new User({
      userId: row.user_id,
      fullname: row.full_name,
      email: row.email,
      password: row.password,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Search users by fullname or email */
  static async search(query) {
    const result = await pool.query(
      `
      SELECT 
        user_id,
        full_name,
        email,
        role,
        created_at,
        updated_at
      FROM users
      WHERE full_name ILIKE $1 OR email ILIKE $1
      `,
      [`%${query}%`]
    );

    return result.rows.map(
      (row) =>
        new User({
          userId: row.user_id,
          fullname: row.full_name,
          email: row.email,
          password: undefined,
          role: row.role,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
    );
  }

  /** Create a new user */
  static async create({ fullname, email, password, role }) {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (full_name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, full_name, email, password, role, created_at, updated_at
      `,
      [fullname, email, hashed, role]
    );

    const row = result.rows[0];
    return new User({
      userId: row.user_id,
      fullname: row.full_name,
      email: row.email,
      password: row.password,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Update user fields (excluding password) */
  static async update(userId, { fullname, email, role }) {
    const result = await pool.query(
      `
      UPDATE users
      SET 
        full_name = COALESCE($1, full_name),
        email = COALESCE($2, email),
        role = COALESCE($3, role),
        updated_at = NOW()
      WHERE user_id = $4
      RETURNING user_id, full_name, email, role, created_at, updated_at
      `,
      [fullname, email, role, userId]
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0];
    return new User({
      userId: row.user_id,
      fullname: row.full_name,
      email: row.email,
      password: undefined,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Update user password */
  static async updatePassword(userId, newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users
      SET password = $1,
          updated_at = NOW()
      WHERE user_id = $2
      `,
      [hash, userId]
    );
  }

  /** Delete user */
  static async delete(userId) {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE user_id = $1
      RETURNING user_id, full_name, email
      `,
      [userId]
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0];
    return {
      userId: row.user_id,
      fullname: row.full_name,
      email: row.email,
    };
  }
}
