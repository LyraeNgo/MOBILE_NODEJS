import {
  addSeatTypeToEventRepo,
  getSeatTypesByEventRepo,
  updateEventSeatTypeRepo,
  deleteSeatTypeFromEventRepo,
  getSeatSummaryByEventRepo,
} from "../Repositories/event_seat_repository.js";

/**
 * Thêm nhiều seat types vào event
 * seatDataArray = [
 *   { seatName: "VIP", availableSeats: 50, price: 150 },
 *   { seatName: "Standard", availableSeats: 200, price: 80 }
 * ]
 */
export const serviceAssignSeatToEvent = async (eventId, seatDataArray) => {
  const created = [];

  for (const seat of seatDataArray) {
    if (!seat.seatName || typeof seat.availableSeats !== "number") {
      continue; // Skip invalid item
    }

    const record = await addSeatTypeToEventRepo(
      eventId,
      seat.seatName,
      seat.availableSeats,
      seat.price || 0
    );

    if (!record) {
      // Nếu 1 bản ghi fail → return null (như logic cũ của bạn)
      return null;
    }

    created.push(record);
  }

  return created;
};

/**
 * Lấy toàn bộ seat types của 1 event
 */
export const serviceGetEventSeats = async (eventId) => {
  const data = await getSeatTypesByEventRepo(eventId);
  const summary = await getSeatSummaryByEventRepo(eventId);

  return {
    data,
    totalAvailableSeats: Number(summary.total_available_seats) || 0,
    totalValue: Number(summary.total_value) || 0,
  };
};

/**
 * Cập nhật seat type
 * - availableSeats
 * - price
 * - seatName
 */
export const serviceUpdateEventSeat = async (
  eventId,
  seatTypeId,
  updateData
) => {
  const { availableSeats, price, seatName } = updateData;

  return await updateEventSeatTypeRepo(
    eventId,
    seatTypeId,
    availableSeats ?? null,
    price ?? null,
    seatName ?? null
  );
};

/**
 * Xóa một seat type khỏi event
 */
export const serviceDeleteEventSeat = async (eventId, seatTypeId) => {
  return await deleteSeatTypeFromEventRepo(eventId, seatTypeId);
};
