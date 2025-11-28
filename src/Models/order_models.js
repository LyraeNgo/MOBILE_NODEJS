export default class Order {
  constructor({
    order_id,
    user_id,
    event_id,
    total_amount,
    status,
    created_at,
    updated_at,
  }) {
    this.orderId = order_id;
    this.userId = user_id;
    this.eventId = event_id;
    this.totalAmount = total_amount;
    this.status = status;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
