// models/Event.js
export class Event {
  constructor({
    event_id,
    organizer_id,
    title,
    description,
    place,
    date,
    time,
    price = 0,
    status = "active",
    createdAt,
    updatedAt,
  }) {
    this.event_id = event_id;
    this.organizer_id = organizer_id; // foreign key to users
    this.title = title;
    this.description = description;
    this.place = place;
    this.date = date;
    this.time = time;
    this.price = price;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
