export default class InviterEvent {
  constructor({
    inviterId,
    eventId,
    fullName,
    email,
    follower,
    roleId,
    image,
    eventTitle,
    eventDate,
    eventPlace,
    createdAt,
  }) {
    this.inviterId = inviterId;
    this.eventId = eventId;

    // inviter info
    this.fullName = fullName;
    this.email = email;
    this.follower = follower;
    this.roleId = roleId;
    this.image = image;

    // event info
    this.eventTitle = eventTitle;
    this.eventDate = eventDate;
    this.eventPlace = eventPlace;

    this.createdAt = createdAt;
  }
}
