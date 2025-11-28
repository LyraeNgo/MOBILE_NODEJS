// repos/eventSeatRepo.js
import pool from "../../config/db.js";
import EventSeatType from "../Models/event_seat_models.js";

/**
 * Thêm một seat type mới cho một event
 * Lưu ý: trước đây bạn truyền seatTypeId (template). Bây giờ mỗi seat type là riêng cho event,
 * do đó truyền seatName + optional price.
 */
export const addSeatTypeToEventRepo = async (
  eventId,
  seatName,
  availableSeats = 0,
  price = 0
) => {
  const insertQuery = `
    INSERT INTO seat_types (event_id, seat_name, available_seats, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { rows } = await pool.query(insertQuery, [
    eventId,
    seatName,
    availableSeats,
    price,
  ]);

  return rows.length ? new EventSeatType(rows[0]) : null;
};

/**
 * Lấy các seat types cho một event
 */
export const getSeatTypesByEventRepo = async (eventId) => {
  const query = `
    SELECT *
    FROM seat_types
    WHERE event_id = $1
    ORDER BY created_at;
  `;

  const { rows } = await pool.query(query, [eventId]);
  // debug log tùy bạn bật/tắt
  // console.log("🚀 ~ getSeatTypesByEventRepo ~ rows:", rows);

  return rows.map((row) => new EventSeatType(row));
};

/**
 * Cập nhật số lượng (và optional price) cho một seat type thuộc event
 * Tránh update chỉ theo seat_type_id để đảm bảo seat thuộc đúng event (bảo mật/đóng gói)
 */
export const updateEventSeatTypeRepo = async (
  eventId,
  seatTypeId,
  availableSeats = null,
  price = null,
  seatName = null
) => {
  // Build dynamic set clause (chỉ set những field truyền vào)
  const sets = [];
  const values = [];
  let idx = 1;

  if (availableSeats !== null) {
    sets.push(`available_seats = $${idx++}`);
    values.push(availableSeats);
  }
  if (price !== null) {
    sets.push(`price = $${idx++}`);
    values.push(price);
  }
  if (seatName !== null) {
    sets.push(`seat_name = $${idx++}`);
    values.push(seatName);
  }

  if (sets.length === 0) {
    // nothing to update
    return null;
  }

  // always update updated_at
  sets.push(`updated_at = NOW()`);

  const query = `
    UPDATE seat_types
    SET ${sets.join(", ")}
    WHERE event_id = $${idx++} AND seat_type_id = $${idx++}
    RETURNING *;
  `;

  values.push(eventId, seatTypeId);

  const { rows } = await pool.query(query, values);
  return rows.length ? new EventSeatType(rows[0]) : null;
};

/**
 * Xóa một seat type của event
 */
export const deleteSeatTypeFromEventRepo = async (eventId, seatTypeId) => {
  const query = `
    DELETE FROM seat_types
    WHERE event_id = $1 AND seat_type_id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [eventId, seatTypeId]);
  return rows.length ? new EventSeatType(rows[0]) : null;
};

/**
 * (Tuỳ chọn) Lấy một seat type theo id (và eventId để bảo mật)
 */
export const getSeatTypeByIdRepo = async (eventId, seatTypeId) => {
  const query = `
    SELECT *
    FROM seat_types
    WHERE event_id = $1 AND seat_type_id = $2;
  `;

  const { rows } = await pool.query(query, [eventId, seatTypeId]);
  return rows.length ? new EventSeatType(rows[0]) : null;
};
