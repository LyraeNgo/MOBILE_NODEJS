import VoucherRepository from "../Repositories/voucher_repository.js";

export default class VoucherService {
  static async getAllVouchers() {
    return await VoucherRepository.findAll();
  }
  static async getVoucherByCode(voucherCode) {
    return await VoucherRepository.findByCode(voucherCode);
  }

  static async createVoucher(data) {
    return await VoucherRepository.create(data);
  }

  static async validateVoucher(code, userId = null) {
    const now = new Date();
    const voucher = await VoucherRepository.findByCode(code);

    if (!voucher) {
      return { valid: false, message: "Voucher does not exist." };
    }

    if (voucher.validFrom && now < voucher.validFrom) {
      return { valid: false, message: "Voucher is not active yet." };
    }

    if (voucher.validTo && now > voucher.validTo) {
      return { valid: false, message: "Voucher has expired." };
    }

    if (voucher.usageLimit && voucher.timesUsed >= voucher.usageLimit) {
      return { valid: false, message: "Voucher usage limit exceeded." };
    }

    return {
      valid: true,
      voucher,
      discount: voucher.discountPercentage,
    };
  }
}
