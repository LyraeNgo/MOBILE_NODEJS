// controllers/events_controller.js
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../Services/event_service.js";

export const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json({
      success: true,
      message: "Retrieved all events",
      data: events,
    });
  } catch (err) {
    console.error("Error in getAllEventsController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEventByIdController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await getEventById(eventId);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res
      .status(200)
      .json({ success: true, message: "Event found", data: event });
  } catch (err) {
    console.error("Error in getEventByIdController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createEventController = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await createEvent(eventData);
    res
      .status(201)
      .json({ success: true, message: "Event created", data: newEvent });
  } catch (err) {
    console.error("Error in createEventController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventData = req.body;
    const updatedEvent = await updateEvent(eventId, eventData);
    if (!updatedEvent)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res
      .status(200)
      .json({ success: true, message: "Event updated", data: updatedEvent });
  } catch (err) {
    console.error("Error in updateEventController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await deleteEvent(eventId);
    if (!deletedEvent)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res
      .status(200)
      .json({ success: true, message: "Event deleted", data: deletedEvent });
  } catch (err) {
    console.error("Error in deleteEventController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEventByDateController = async (req, res) => {
  try {
    const { date } = req.params;
    const event = await getEventById(date);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    res
      .status(200)
      .json({ success: true, message: "Event found", data: event });
  } catch (err) {
    console.error("Error in getEventByIdController:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
