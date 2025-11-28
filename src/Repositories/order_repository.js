import pool from "../../config/db.js";
import Order from "../Models/order_models.js";
import OrderItem from "../Models/order_item_models.js";

/* =============================
   ORDER REPOSITORY
   ============================= */

// Tạo order mới (status mặc định: pending)
export const createOrderRepo = async (userId, eventId, totalAmount) => {
  const query = `
    INSERT INTO orders (user_id, event_id, total_amount)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [userId, eventId, totalAmount]);
  return rows.length ? new Order(rows[0]) : null;
};

// Tạo 1 order item
export const createOrderItemRepo = async (
  orderId,
  seatTypeId,
  quantity,
  price
) => {
  const query = `
    INSERT INTO order_items (order_id, seat_type_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [
    orderId,
    seatTypeId,
    quantity,
    price,
  ]);
  return rows.length ? new OrderItem(rows[0]) : null;
};

// Lấy chi tiết order + items
export const getOrderByIdRepo = async (orderId) => {
  const orderQuery = `SELECT * FROM orders WHERE order_id = $1`;
  const { rows: orderRows } = await pool.query(orderQuery, [orderId]);
  if (!orderRows.length) return null;

  const itemsQuery = `SELECT * FROM order_items WHERE order_id = $1`;
  const { rows: itemRows } = await pool.query(itemsQuery, [orderId]);

  return {
    ...orderRows[0],
    items: itemRows,
  };
};

/* =============================
   SEAT TYPE REPOSITORY
   ============================= */

// Lấy thông tin seat type (available + price)
export const getAvailableSeatsRepo = async (eventId, seatTypeId) => {
  const query = `
    SELECT available_seats, price
    FROM seat_types
    WHERE event_id=$1 AND seat_type_id=$2
  `;
  const { rows } = await pool.query(query, [eventId, seatTypeId]);
  return rows.length ? rows[0] : null;
};

// Cập nhật số lượng vé còn lại
export const updateAvailableSeatsRepo = async (
  eventId,
  seatTypeId,
  newAvailable
) => {
  const query = `
    UPDATE seat_types
    SET available_seats=$3, updated_at=NOW()
    WHERE event_id=$1 AND seat_type_id=$2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [eventId, seatTypeId, newAvailable]);
  return rows.length ? rows[0] : null;
};

// Lấy seat type cho event (chi tiết) dùng trong thanh toán
export const getEventSeatTypeRepo = async (eventId, seatTypeId) => {
  const query = `
    SELECT *
    FROM seat_types
    WHERE event_id=$1 AND seat_type_id=$2
  `;
  const { rows } = await pool.query(query, [eventId, seatTypeId]);
  return rows.length ? rows[0] : null;
};

// seatTypeId là UUID
export const updateEventSeatTypeQuantityRepo = async (
  seatTypeId,
  newAvailable
) => {
  const query = `
    UPDATE seat_types
    SET available_seats=$2, updated_at=NOW()
    WHERE seat_type_id=$1
    RETURNING *
  `;
  const { rows } = await pool.query(query, [seatTypeId, newAvailable]);
  return rows.length ? rows[0] : null;
};

/* =============================
   USER REPOSITORY (PAYMENT)
   ============================= */

// Lấy số dư ví
export const getUserBalanceRepo = async (userId) => {
  const query = `SELECT balance FROM users WHERE user_id=$1`;
  const { rows } = await pool.query(query, [userId]);
  return rows[0]?.balance || null;
};

// Cập nhật số dư user
export const updateUserBalanceRepo = async (userId, newBalance) => {
  const query = `
    UPDATE users
    SET balance=$2, updated_at=NOW()
    WHERE user_id=$1
    RETURNING *
  `;
  const { rows } = await pool.query(query, [userId, newBalance]);
  return rows[0];
};

/* =============================
   ORDER STATUS
   ============================= */

// Cập nhật trạng thái order (pending → completed/cancelled)
export const updateOrderStatusRepo = async (orderId, status) => {
  const query = `
    UPDATE orders
    SET status=$2, updated_at=NOW()
    WHERE order_id=$1
    RETURNING *
  `;
  const { rows } = await pool.query(query, [orderId, status]);
  return rows.length ? rows[0] : null;
};

/* =============================
   TRANSACTION WRAPPER
   ============================= */

export const runTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const data = await callback(client);
    await client.query("COMMIT");
    return data;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
