export default class Voucher {
  constructor({
    voucherId,
    code,
    discountPercentage,
    validFrom,
    validTo,
    usageLimit,
    timesUsed,
    createdAt,
    updatedAt,
  }) {
    this.voucherId = voucherId;
    this.code = code;
    this.discountPercentage = discountPercentage;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.usageLimit = usageLimit;
    this.timesUsed = timesUsed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
