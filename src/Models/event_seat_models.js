// Models/event_seat_models.js
export default class EventSeatType {
  constructor({
    seat_type_id,
    event_id,
    seat_name,
    available_seats,
    price,
    created_at,
    updated_at,
  }) {
    // giữ tên thuộc tính cũ một số chỗ để tương thích với client/service nếu cần
    this.seatTypeId = seat_type_id;
    this.eventId = event_id;
    this.seatName = seat_name;
    this.availableSeats = available_seats;
    this.price = price;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
