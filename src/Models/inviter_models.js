export default class Inviter {
  constructor({ inviterId, fullName, email, follower = 0, roleId, image, createdAt, updatedAt }) {
    this.inviterId = inviterId;
    this.fullName = fullName;
    this.email = email;
    this.follower = follower;
    this.roleId = roleId;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
