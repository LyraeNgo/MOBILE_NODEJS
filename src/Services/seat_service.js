import SeatTypeRepository from "../Repositories/seat_repository.js";

export async function serviceGetAllSeatTypes() {
  return await SeatTypeRepository.findAll();
}

export async function serviceGetSeatTypeById(id) {
  try {
    const seat = await SeatTypeRepository.findById(id);
    return seat;
  } catch (error) {
    return error;
  }
}

export async function serviceCreateSeatType(data) {
  const { seatName } = data;
  try {
    const all = await SeatTypeRepository.findAll();
    if (
      all.some((item) => item.seatName.toLowerCase() === seatName.toLowerCase())
    ) {
      return null;
    }

    return await SeatTypeRepository.create(seatName);
  } catch (error) {
    return error;
  }
}

export async function serviceUpdateSeatType(id, data) {
  const exists = await SeatTypeRepository.findById(id);
  if (!exists) throw new Error("Seat type not found");

  return await SeatTypeRepository.update(id, data.seatName);
}

export async function serviceDeleteSeatType(id) {
  const exists = await SeatTypeRepository.findById(id);
  if (!exists) throw new Error("Seat type not found");

  return await SeatTypeRepository.delete(id);
}
