import InviterEventService from "../Services/event_inviter_service.js";

export default class InviterEventController {
  static async addInviterToEvent(req, res) {
    try {
      const { inviterId, eventId } = req.body;
      const result = await InviterEventService.addInviterToEvent(
        inviterId,
        eventId
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  static async removeInviterFromEvent(req, res) {
    try {
      const { inviterId, eventId } = req.body;
      const result = await InviterEventService.removeInviterFromEvent(
        inviterId,
        eventId
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  static async getInvitersByEvent(req, res) {
    try {
      const { eventId } = req.params;
      const result = await InviterEventService.getInvitersByEvent(eventId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  static async getEventsByInviter(req, res) {
    try {
      const { inviterId } = req.params;
      const result = await InviterEventService.getEventsByInviter(inviterId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
}
