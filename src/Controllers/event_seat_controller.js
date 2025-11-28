import {
  serviceAssignSeatToEvent,
  serviceGetEventSeats,
  serviceUpdateEventSeat,
  serviceDeleteEventSeat,
} from "../Services/event_seat_service.js";

export const assignSeatsToEventController = async (req, res) => {
  const { eventId } = req.params;
  const seatList = req.body; // expect: [ { seatTypeId, availableSeats }, ... ]

  if (!Array.isArray(seatList) || seatList.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Seat list cannot be empty.",
      data: null,
    });
  }

  try {
    const result = await serviceAssignSeatToEvent(eventId, seatList);
    console.log("🚀 ~ assignSeatsToEventController ~ result:", result);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "This Seat type is already exist in this event.",
        data: null,
      });
    }
    res.status(201).json({
      success: true,
      message: "Seat assignments created successfully.",
      data: result,
    });
  } catch (err) {
    console.error("Assign Seats Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const getEventSeatsController = async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await serviceGetEventSeats(eventId);
    res.status(200).json({
      success: true,
      message: "Seat types retrieved.",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const updateEventSeatController = async (req, res) => {
  const { eventId, seatTypeId } = req.params;
  const { availableSeats } = req.body;

  try {
    const result = await serviceUpdateEventSeat(
      eventId,
      seatTypeId,
      availableSeats
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Seat type not found for this event.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat type updated successfully.",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

export const deleteEventSeatController = async (req, res) => {
  const { eventId, seatTypeId } = req.params;

  try {
    const result = await serviceDeleteEventSeat(eventId, seatTypeId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Seat type not found for this event.",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat type removed from event.",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};
