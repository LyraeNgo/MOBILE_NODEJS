import pool from "../../config/db.js";
import Voucher from "../Models/voucher_models.js";

export default class VoucherRepository {
  /** Lấy tất cả vouchers */
  static async findAll() {
    const result = await pool.query(`
      SELECT voucher_id, code, discount_percentage, valid_from, valid_to,
             usage_limit, times_used, created_at, updated_at
      FROM vouchers
      ORDER BY created_at DESC
    `);

    return result.rows.map(
      (row) =>
        new Voucher({
          voucherId: row.voucher_id,
          code: row.code,
          discountPercentage: row.discount_percentage,
          validFrom: row.valid_from,
          validTo: row.valid_to,
          usageLimit: row.usage_limit,
          timesUsed: row.times_used,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
    );
  }

  /** Lấy voucher theo code */
  static async findByCode(code) {
    const result = await pool.query(`SELECT * FROM vouchers WHERE code = $1`, [
      code,
    ]);
    if (!result.rows[0]) return null;

    const row = result.rows[0];
    return new Voucher({
      voucherId: row.voucher_id,
      code: row.code,
      discountPercentage: row.discount_percentage,
      validFrom: row.valid_from,
      validTo: row.valid_to,
      usageLimit: row.usage_limit,
      timesUsed: row.times_used,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Tạo voucher mới */
  static async create({
    code,
    discountPercentage,
    validFrom,
    validTo,
    usageLimit,
  }) {
    const result = await pool.query(
      `INSERT INTO vouchers (code, discount_percentage, valid_from, valid_to, usage_limit)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [code, discountPercentage, validFrom, validTo, usageLimit]
    );
    const row = result.rows[0];
    return new Voucher({
      voucherId: row.voucher_id,
      code: row.code,
      discountPercentage: row.discount_percentage,
      validFrom: row.valid_from,
      validTo: row.valid_to,
      usageLimit: row.usage_limit,
      timesUsed: row.times_used,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  /** Tăng số lần sử dụng voucher */
  static async updateUsage(voucherId) {
    await pool.query(
      `UPDATE vouchers
       SET times_used = times_used + 1, updated_at = NOW()
       WHERE voucher_id = $1`,
      [voucherId]
    );
  }

  /** Kiểm tra voucher có thuộc về user hay không */
  static async checkUserVoucher(userId, voucherCode) {
    const result = await pool.query(
      `SELECT uv.user_id, uv.voucher_id
       FROM user_vouchers uv
       JOIN vouchers v ON uv.voucher_id = v.voucher_id
       WHERE uv.user_id = $1 AND v.code = $2`,
      [userId, voucherCode]
    );
    return result.rows.length > 0;
  }
}
