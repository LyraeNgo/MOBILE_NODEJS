import InviterEventRepository from "../Repositories/event_inviter_repository.js";

export default class EventInviterService {
  static async addInviterToEvent(inviterId, eventId) {
    const data = await InviterEventRepository.addInviterToEvent({
      inviterId,
      eventId,
    });

    return {
      success: true,
      message: "Inviter assigned to event",
      data,
    };
  }

  static async removeInviterFromEvent(inviterId, eventId) {
    const data = await InviterEventRepository.removeInviterFromEvent({
      inviterId,
      eventId,
    });

    if (!data)
      return {
        success: false,
        message: "Inviter is not assigned to this event",
      };

    return {
      success: true,
      message: "Inviter removed from event",
      data,
    };
  }

  static async getInvitersByEvent(eventId) {
    const data = await InviterEventRepository.getInvitersByEvent(eventId);
    return { success: true, data };
  }

  static async getEventsByInviter(inviterId) {
    const data = await InviterEventRepository.getEventsByInviter(inviterId);
    return { success: true, data };
  }
}
