import {
  createOrderRepo,
  createOrderItemRepo,
  getAvailableSeatsRepo,
  updateAvailableSeatsRepo,
  getOrderByIdRepo,
  getUserBalanceRepo,
  getEventSeatTypeRepo,
  updateEventSeatTypeQuantityRepo,
  updateUserBalanceRepo,
  updateOrderStatusRepo,
} from "../Repositories/order_repository.js";

export const serviceCreateOrder = async (userId, eventId, items) => {
  let totalAmount = 0;
  const seatUpdates = [];

  // 1. Kiểm tra số lượng vé và tính tổng tiền
  for (const item of items) {
    const seatInfo = await getAvailableSeatsRepo(eventId, item.seatTypeId);
    if (!seatInfo)
      throw new Error(`Seat type ${item.seatTypeId} not found for event`);
    if (seatInfo.available_seats < item.quantity)
      throw new Error(`Not enough seats for seat type ${item.seatTypeId}`);

    totalAmount += seatInfo.price * item.quantity;
    seatUpdates.push({
      seatTypeId: item.seatTypeId,
      newAvailable: seatInfo.available_seats - item.quantity,
      quantity: item.quantity,
      price: seatInfo.price,
    });
  }

  // 2. Tạo order
  const order = await createOrderRepo(userId, eventId, totalAmount);

  // 3. Tạo order items và cập nhật số vé
  const createdItems = [];
  for (const seat of seatUpdates) {
    const orderItem = await createOrderItemRepo(
      order.orderId,
      seat.seatTypeId,
      seat.quantity,
      seat.price
    );
    createdItems.push(orderItem);
    await updateAvailableSeatsRepo(eventId, seat.seatTypeId, seat.newAvailable);
  }

  return { order, items: createdItems };
};
// Lấy chi tiết order theo orderId
export const serviceGetOrderById = async (orderId) => {
  const order = await getOrderByIdRepo(orderId);
  return order;
};

export const servicePayOrder = async (orderId) => {
  // 1. Lấy order + order items
  const order = await getOrderByIdRepo(orderId);
  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status !== "pending") {
    return {
      success: false,
      message: "Order already paid or cancelled.",
    };
  }

  const userId = order.user_id;
  const totalAmount = Number(order.total_amount);

  // 2. Lấy balance user
  const balance = await getUserBalanceRepo(userId);
  if (balance === null) {
    return { success: false, message: "User not found." };
  }

  if (Number(balance) < totalAmount) {
    return { success: false, message: "Insufficient balance." };
  }

  // 3. Check số lượng ghế
  for (const item of order.items) {
    const seat = await getEventSeatTypeRepo(order.event_id, item.seat_type_id);
    if (!seat) {
      return {
        success: false,
        message: "Seat type not found for this event.",
      };
    }

    if (seat.available_seats < item.quantity) {
      return {
        success: false,
        message: `Not enough seats for ${seat.seat_name}.`,
      };
    }

    // cập nhật available seats
    const newAvailable = seat.available_seats - item.quantity;
    await updateEventSeatTypeQuantityRepo(item.seat_type_id, newAvailable);
  }

  // 4. Trừ tiền user
  const newBalance = Number(balance) - totalAmount;
  await updateUserBalanceRepo(userId, newBalance);

  // 5. Cập nhật order thành completed
  const updatedOrder = await updateOrderStatusRepo(orderId, "completed");

  return {
    success: true,
    message: "Payment successful.",
    data: {
      order: updatedOrder,
      newBalance,
    },
  };
};
