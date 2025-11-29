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

import VoucherRepository from "../Repositories/voucher_repository.js";

/* ==========================
   CREATE ORDER
   ========================== */
export const serviceCreateOrder = async (
  userId,
  eventId,
  items,
  voucherCode = null
) => {
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

  let discount = 0;
  let voucher = null;

  // 2. Kiểm tra voucher
  if (voucherCode) {
    voucher = await VoucherRepository.findByCode(voucherCode);
    console.log("🚀 ~ serviceCreateOrder ~ voucher:", voucher);

    // Kiểm tra user có voucher này không
    const hasVoucher = await VoucherRepository.checkUserVoucher(
      userId,
      voucherCode
    );
    if (!voucher || !hasVoucher) {
      throw new Error("Voucher is invalid or not assigned to user.");
    }

    const now = new Date();
    if (
      (voucher.validFrom && now < new Date(voucher.validFrom)) ||
      (voucher.validTo && now > new Date(voucher.validTo)) ||
      (voucher.usageLimit && voucher.timesUsed >= voucher.usageLimit)
    ) {
      throw new Error("Voucher is expired or usage limit reached.");
    }

    discount = (totalAmount * Number(voucher.discountPercentage)) / 100;
    totalAmount -= discount;
  }

  // 3. Tạo order
  const order = await createOrderRepo(userId, eventId, totalAmount);

  // 4. Tạo order items và cập nhật số vé
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

  // 5. Nếu voucher có, tăng times_used
  if (voucher) {
    await VoucherRepository.updateUsage(voucher.voucherId);
  }

  return {
    order,
    items: createdItems,
    discount,
    voucherCode: voucherCode || null,
  };
};

/* ==========================
   PAY ORDER
   ========================== */
export const servicePayOrder = async (orderId) => {
  const order = await getOrderByIdRepo(orderId);
  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status !== "pending") {
    return { success: false, message: "Order already paid or cancelled." };
  }

  const userId = order.user_id;
  let totalAmount = Number(order.total_amount);

  // 1. Lấy balance user
  const balance = await getUserBalanceRepo(userId);
  if (balance === null) {
    return { success: false, message: "User not found." };
  }

  if (Number(balance) < totalAmount) {
    return { success: false, message: "Insufficient balance." };
  }

  // 2. Check số lượng ghế và cập nhật
  for (const item of order.items) {
    const seat = await getEventSeatTypeRepo(order.event_id, item.seat_type_id);
    if (!seat) {
      return { success: false, message: "Seat type not found for this event." };
    }
    if (seat.available_seats < item.quantity) {
      return {
        success: false,
        message: `Not enough seats for ${seat.seat_name}.`,
      };
    }

    const newAvailable = seat.available_seats - item.quantity;
    await updateEventSeatTypeQuantityRepo(item.seat_type_id, newAvailable);
  }

  // 3. Trừ tiền user
  const newBalance = Number(balance) - totalAmount;
  await updateUserBalanceRepo(userId, newBalance);

  // 4. Cập nhật order thành completed
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

export const serviceGetOrderById = async (orderId) => {
  return getOrderByIdRepo(orderId);
};
