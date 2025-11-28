export default class OrderItem {
  constructor({
    order_item_id,
    order_id,
    seat_type_id,
    quantity,
    price,
    created_at,
    updated_at,
  }) {
    this.orderItemId = order_item_id;
    this.orderId = order_id;
    this.seatTypeId = seat_type_id;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
