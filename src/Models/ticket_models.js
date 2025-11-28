export class Ticket {
  constructor(row) {
    this.ticketId = row.ticket_id;
    this.eventId = row.event_id;
    this.userId = row.user_id;
    this.ticketType = row.ticket_type;
    this.price = row.price;
    this.quantity = row.quantity;
    this.createdAt = row.created_at;
    this.updatedAt = row.updated_at;
  }
}
