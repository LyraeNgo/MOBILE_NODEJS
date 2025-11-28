import pool from "../../config/db.js";
import Review from "../Models/review_models.js";

export const createReviewRepo = async (userId, eventId, rating, comment) => {
  const query = `
    INSERT INTO reviews (user_id, event_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [userId, eventId, rating, comment]);
  return rows.length ? new Review(rows[0]) : null;
};

export const getReviewByIdRepo = async (reviewId) => {
  const query = `
    SELECT * FROM reviews WHERE review_id = $1;
  `;
  const { rows } = await pool.query(query, [reviewId]);
  return rows.length ? new Review(rows[0]) : null;
};

export const getReviewsByEventRepo = async (eventId) => {
  const query = `
    SELECT * FROM reviews WHERE event_id = $1 ORDER BY created_at DESC;
  `;
  const { rows } = await pool.query(query, [eventId]);
  return rows.map((row) => new Review(row));
};

export const updateReviewRepo = async (reviewId, rating, comment) => {
  const query = `
    UPDATE reviews
    SET rating = $2,
        comment = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE review_id = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [reviewId, rating, comment]);
  return rows.length ? new Review(rows[0]) : null;
};

export const deleteReviewRepo = async (reviewId) => {
  const query = `
    DELETE FROM reviews WHERE review_id = $1 RETURNING *;
  `;
  const { rows } = await pool.query(query, [reviewId]);
  return rows.length ? new Review(rows[0]) : null;
};
