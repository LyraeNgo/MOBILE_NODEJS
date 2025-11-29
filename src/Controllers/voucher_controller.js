import VoucherService from "../Services/voucher_service.js";

export default class VoucherController {
  static async getAll(req, res) {
    try {
      const vouchers = await VoucherService.getAllVouchers();
      res.json({ success: true, message: "success", data: vouchers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const voucher = await VoucherService.createVoucher(req.body);
      res.json({ success: true, message: "Voucher created", data: voucher });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async validate(req, res) {
    try {
      const { code, userId } = req.body;
      const result = await VoucherService.validateVoucher(code, userId);

      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
